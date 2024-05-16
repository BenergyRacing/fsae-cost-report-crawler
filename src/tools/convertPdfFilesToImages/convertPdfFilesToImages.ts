import pathUtils from 'path';
import fs from 'fs/promises';
import { Poppler } from 'node-poppler';
import { Cost } from '../../models/cost';
import { CostAttachment } from '../../models/cost-attachment';

export async function convertPdfFilesToImages(cost: Cost, outputDir: string): Promise<void> {
  console.log(`Checking vehicle attachments...`);
  await convertPdfFileToImage(outputDir, cost.attachments);

  for (const system of cost.systems) {
    console.log(`Checking system ${system.name} attachments...`);
    await convertPdfFileToImage(outputDir, system.attachments);

    for (const assembly of system.assemblies!) {
      console.log(`Checking assembly ${assembly.title} attachments...`);
      await convertPdfFileToImage(outputDir, assembly.attachments);

      for (const part of assembly.bom!.parts!) {
        console.log(`Checking part ${part.part} attachments...`);
        await convertPdfFileToImage(outputDir, part.attachments);
      }
    }
  }
}

async function convertPdfFileToImage(outputDir: string, attachments: CostAttachment[] | undefined): Promise<void> {
  if (!attachments)
    return;

  const imageAttachments: CostAttachment[] = [];

  for (const attachment of attachments) {
    if (!attachment.path || !attachment.path.toLowerCase().endsWith('.pdf'))
      continue;

    const outputFile = attachment.path + '.png';

    const existingImage = attachments.some(att => att.downloadUrl === attachment.downloadUrl && att.path === outputFile);

    if (existingImage) {
      console.log(`Skipping ${attachment.path}, already converted.`);
      continue;
    }

    console.log(`Converting ${attachment.path}...`);
    const path = pathUtils.join(outputDir, attachment.path);

    const poppler = new Poppler();
    const res = await poppler.pdfToCairo(path, undefined, {
      pngFile: true,
      singleFile: true,
    });

    const outputPath = pathUtils.join(outputDir, outputFile);
    await fs.writeFile(outputPath, res, { encoding: 'binary' });

    imageAttachments.push({
      ...attachment,
      path: outputFile,
      size: res.length,
    });
  }

  attachments.push(...imageAttachments);
}
