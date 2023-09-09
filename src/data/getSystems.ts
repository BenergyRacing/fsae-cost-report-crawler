import { Page } from 'puppeteer';
import { CostAssembly } from './getAssemblies';
import { CostAttachment } from './getAttachments';
import { parseTable } from '../utils/table';

export interface CostSystem {
  name: string;
  price: string;
  manageUrl: string;
  assemblies?: CostAssembly[];
  attachments?: CostAttachment[];
}

export async function getSystems(page: Page): Promise<CostSystem[]> {
  const table = await page.waitForSelector('#content .table-responsive table');
  const results = await table!.evaluate(parseTable);

  return results.map(result => {
    return {
      name: result['System'].text,
      price: result['System Cost'].text,
      manageUrl: result['Actions']['Manage Assemblies'],
    };
  });
}
