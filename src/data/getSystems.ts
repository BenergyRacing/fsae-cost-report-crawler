import { Page } from 'puppeteer';
import { parseTable } from '../utils/table';
import { environment } from '../environment/environment';
import { CostAssembly } from './getAssemblies';
import { CostAttachment } from './getAttachments';

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
