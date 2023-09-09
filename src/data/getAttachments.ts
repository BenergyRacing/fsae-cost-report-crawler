import { Page } from 'puppeteer';
import { CostAttachment } from '../models/cost-attachment';

export async function getAttachments(page: Page): Promise<CostAttachment[]> {
  const table = await page.waitForSelector('.attachments-list table');

  return await table!.evaluate(parseAttachmentTable);
}

function parseAttachmentTable(table: HTMLTableElement): CostAttachment[] {
  const results: CostAttachment[] = [];
  const trs = table.querySelectorAll('tr');

  trs.forEach(tr => {
    const attachment: CostAttachment = {
      title: tr.querySelector<HTMLElement>('td.title')?.innerText || '',
      type: tr.querySelector<HTMLElement>('td.type')?.innerText || '',
      downloadUrl: tr.querySelector<HTMLElement>('td.actions a:not([class~="delete"])')?.getAttribute('href') || '',
    };

    results.push(attachment);
  });

  return results;
}
