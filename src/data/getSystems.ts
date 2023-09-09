import { Page } from 'puppeteer';
import { CostSystem } from '../models/cost-system';
import { parseTable } from '../utils/table';

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
