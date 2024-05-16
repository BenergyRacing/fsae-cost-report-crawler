import { ElementHandle, Page } from 'puppeteer';
import { CatalogLinks } from '../getCatalogLinks';
import { CatalogFastener } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';
import { getInputFromLabel, getInputFromQuery } from '../../utils/input';

export async function getCatalogFasteners(page: Page, links: CatalogLinks): Promise<CatalogFastener[]> {
  console.log('Fetching all catalog fasteners...');

  return await getCatalogItems(page, links.fastenersUrl, 'FastenerID', getFastener);
}

async function getFastener(form: ElementHandle<HTMLFormElement>, id: string): Promise<CatalogFastener> {
  return {
    id: id,
    title: await form.evaluate(getInputFromLabel, 'Title'),
    supplier: await form.evaluate(getInputFromLabel, 'Supplier'),
    category: await form.evaluate(getInputFromLabel, 'Category'),
    size1: await form.evaluate(getInputFromLabel, 'Size 1 Label'),
    size2: await form.evaluate(getInputFromLabel, 'Size 2 Label'),
    unit1: await form.evaluate(getInputFromLabel, 'Measurement Unit 1 Code'),
    unit2: await form.evaluate(getInputFromLabel, 'Measurement Unit 2 Code'),
    description: await form.evaluate(getInputFromLabel, 'Description'),
    commonNamesLabel: await form.evaluate(getInputFromLabel, 'Common Names Label'),
    commonNames: await form.evaluate(getInputFromLabel, 'Common Names'),
    costFormula: await form.evaluate(getInputFromQuery, 'input.formula.formula-value'),
    c1: await form.evaluate(getInputFromQuery, 'input.c1.formula-value'),
    c2: await form.evaluate(getInputFromQuery, 'input.c2.formula-value'),
    obsolete: await form.evaluate(getInputFromLabel, 'Obsolete'),
    obsoleteComments: await form.evaluate(getInputFromLabel, 'Obsolete Comments'),
  };
}
