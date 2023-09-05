import { Page } from 'puppeteer';
import { environment } from '../environment/environment';
import { parseTable } from '../utils/table';
import { CostBom } from './getBom';

export interface CostAssembly {
  title: string;
  partNumber: string;
  quantity: string;
  totalCost: string;
  viewUrl: string;

  bom?: CostBom;
}

export async function getAssemblies(page: Page, url: string): Promise<CostAssembly[]> {
  const absoluteUrl = new URL(url, environment.baseUrl).href;

  await page.goto(absoluteUrl);

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
