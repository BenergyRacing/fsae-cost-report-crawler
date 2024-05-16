import { ElementHandle, Page } from 'puppeteer';
import { CatalogLinks } from '../getCatalogLinks';
import { CatalogTool } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';
import { getInputFromLabel } from '../../utils/input';

export async function getCatalogTools(page: Page, links: CatalogLinks): Promise<CatalogTool[]> {
  console.log('Fetching all catalog tools...');

  return await getCatalogItems(page, links.toolingUrl, 'ToolID', getProcess);
}

async function getProcess(form: ElementHandle<HTMLFormElement>, id: string): Promise<CatalogTool> {
  return {
    id: id,
    title: await form.evaluate(getInputFromLabel, 'Title'),
    process: await form.evaluate(getInputFromLabel, 'Process'),
    unit: await form.evaluate(getInputFromLabel, 'Measurement Unit Code'),
    description: await form.evaluate(getInputFromLabel, 'Description'),
    cost: await form.evaluate(getInputFromLabel, 'Cost'),
    obsolete: await form.evaluate(getInputFromLabel, 'Obsolete'),
    obsoleteComments: await form.evaluate(getInputFromLabel, 'Obsolete Comments'),
  };
}
