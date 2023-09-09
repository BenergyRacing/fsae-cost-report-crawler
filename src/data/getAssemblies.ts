import { Page } from 'puppeteer';
import { CostAssembly } from '../models/cost-assembly';
import { parseTable } from '../utils/table';

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
