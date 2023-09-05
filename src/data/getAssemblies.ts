import { Page } from 'puppeteer';
import { CostBom } from './getBom';
import { CostAttachment } from './getAttachments';
import { parseTable } from '../utils/table';

export interface CostAssembly {
  title: string;
  partNumber: string;
  quantity: string;
  totalCost: string;
  viewUrl: string;

  bom?: CostBom;
  attachments?: CostAttachment[];
}

export async function getAssemblies(page: Page): Promise<CostAssembly[]> {
  const table = await page.waitForSelector('#content .table-responsive table');
  const results = await table!.evaluate(parseTable);

  return results.map(result => {
    return {
      title: result['Title'].text,
      partNumber: result['Part #'].text,
      quantity: result['Quantity'].text,
      totalCost: result['Total Cost'].text,
      viewUrl: result['Actions']['View / Edit'],
    };
  });
}
