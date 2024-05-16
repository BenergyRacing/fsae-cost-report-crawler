import { ElementHandle, Page } from 'puppeteer';
import { CatalogLinks } from '../getCatalogLinks';
import { CatalogProcess } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';
import { getInputFromLabel } from '../../utils/input';

export async function getCatalogProcesses(page: Page, links: CatalogLinks): Promise<CatalogProcess[]> {
  console.log('Fetching all catalog processes...');

  return await getCatalogItems(page, links.processesUrl, 'ProcessID', getProcess);
}

async function getProcess(form: ElementHandle<HTMLFormElement>, id: string): Promise<CatalogProcess> {
  return {
    id: id,
    title: await form.evaluate(getInputFromLabel, 'Title'),
    supplier: await form.evaluate(getInputFromLabel, 'Supplier'),
    category: await form.evaluate(getInputFromLabel, 'Category'),
    unit1: await form.evaluate(getInputFromLabel, 'Measurement Unit 1 Code'),
    toolingRequired: await form.evaluate(getInputFromLabel, 'ToolingRequired'),
    nearNetShape: await form.evaluate(getInputFromLabel, 'Near Net Shape'),
    processMultiplierType: await form.evaluate(getInputFromLabel, 'Process Multiplier Type'),
    description: await form.evaluate(getInputFromLabel, 'Description'),
    commonNamesLabel: await form.evaluate(getInputFromLabel, 'Common Names Label'),
    commonNames: await form.evaluate(getInputFromLabel, 'Common Names'),
    unitCost: await form.evaluate(getInputFromLabel, 'Unit Cost'),
    obsolete: await form.evaluate(getInputFromLabel, 'Obsolete'),
    obsoleteComments: await form.evaluate(getInputFromLabel, 'Obsolete Comments'),
  };
}
