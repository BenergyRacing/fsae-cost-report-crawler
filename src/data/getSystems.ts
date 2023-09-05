import { Page } from 'puppeteer';
import { parseTable } from '../utils/table';
import { environment } from '../environment/environment';
import { CostAssembly } from './getAssemblies';

export interface CostSystem {
  name: string;
  price: string;
  manageUrl: string;
  assemblies?: CostAssembly[];
}

export async function getSystems(page: Page, url: string): Promise<CostSystem[]> {
  const absoluteUrl = new URL(url, environment.baseUrl).href;

  await page.goto(absoluteUrl);

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
