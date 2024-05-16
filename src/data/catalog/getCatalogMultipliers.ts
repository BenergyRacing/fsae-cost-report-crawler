import { ElementHandle, Page } from 'puppeteer';
import { CatalogLinks } from '../getCatalogLinks';
import { CatalogMultiplier } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';
import { getInputFromLabel } from '../../utils/input';

export async function getCatalogMultipliers(page: Page, links: CatalogLinks): Promise<CatalogMultiplier[]> {
  console.log('Fetching all catalog multipliers...');

  return await getCatalogItems(page, links.multipliersUrl, 'ProcessMultiplierID', getMultiplier);
}

async function getMultiplier(form: ElementHandle<HTMLFormElement>, id: string): Promise<CatalogMultiplier> {
  return {
    id: id,
    type: await form.evaluate(getInputFromLabel, 'Multiplier Type'),
    title: await form.evaluate(getInputFromLabel, 'Multiplier Title'),
    description: await form.evaluate(getInputFromLabel, 'Description'),
    multiplierValue: await form.evaluate(getInputFromLabel, 'Multiplier Value'),
    obsolete: await form.evaluate(getInputFromLabel, 'Obsolete'),
    obsoleteComments: await form.evaluate(getInputFromLabel, 'Obsolete Comments'),
  };
}
