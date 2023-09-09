import { Page } from 'puppeteer';
import { Cost } from './models/cost';
import { CostAttachment } from './models/cost-attachment';
import { downloadAttachment } from './data/downloadAttachment';

export async function downloadFiles(page: Page, cost: Cost, outputDir: string): Promise<void> {
  console.log(`Checking vehicle attachments...`);
  await downloadAttachments(page, outputDir, cost.attachments);

  for (const system of cost.systems) {
    console.log(`Checking system ${system.name} attachments...`);
    await downloadAttachments(page, outputDir, system.attachments);

    for (const assembly of system.assemblies!) {
      console.log(`Checking assembly ${assembly.title} attachments...`);
      await downloadAttachments(page, outputDir, assembly.attachments);

      for (const part of assembly.bom!.parts!) {
        console.log(`Checking part ${part.part} attachments...`);
        await downloadAttachments(page, outputDir, part.attachments);
      }
    }
  }
}

async function downloadAttachments(page: Page, outputDir: string, attachments: CostAttachment[] | undefined): Promise<void> {
  if (!attachments)
    return;

  for (const attachment of attachments) {
    console.log(`Downloading ${attachment.title}...`);
    await downloadAttachment(page, outputDir, attachment);
  }
}
