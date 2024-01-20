import * as pathUtils from 'path';
import * as fs from 'fs/promises';
import { Poppler } from 'node-poppler';
import { Cost } from '../models/cost';
import { CostAttachment } from '../models/cost-attachment';
import { question } from '../utils/readline';

(async function () {
  const vehicleId = await question('Vehicle ID: ');

  const costDir = pathUtils.join('./out', vehicleId);
  const costPath = pathUtils.join(costDir, './cost-report.json');

  console.log(`Reading cost at ${costPath}...`);

  const costStr = await fs.readFile(costPath, 'utf8');
  const cost: Cost = JSON.parse(costStr);

  await convertPdfFilesToImages(cost, costDir);

  console.log(`Updating JSON file...`);
  await fs.writeFile(costPath, JSON.stringify(cost, null, 4), 'utf8');

  console.log(`Done.`);
})();

async function convertPdfFilesToImages(cost: Cost, outputDir: string): Promise<void> {
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
