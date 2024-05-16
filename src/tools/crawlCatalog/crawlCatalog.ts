import { Page } from 'puppeteer';
import { CatalogLinks } from '../../data/getCatalogLinks';
import { Catalog } from '../../models/catalog';
import { getCatalogMaterials } from '../../data/catalog/getCatalogMaterials';
import { getCatalogFasteners } from '../../data/catalog/getCatalogFasteners';
import { getCatalogProcesses } from '../../data/catalog/getCatalogProcesses';
import { getCatalogMultipliers } from '../../data/catalog/getCatalogMultipliers';
import { getCatalogTools } from '../../data/catalog/getCatalogTools';

export async function crawlCatalog(page: Page, links: CatalogLinks): Promise<Catalog> {
  console.log('Fetching the full FSAEOnline catalog...');

  return {
    materials: await getCatalogMaterials(page, links),
    fasteners: await getCatalogFasteners(page, links),
    processes: await getCatalogProcesses(page, links),
    processMultipliers: await getCatalogMultipliers(page, links),
    tools: await getCatalogTools(page, links),
  };
}
