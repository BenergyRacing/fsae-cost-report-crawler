import { Page } from 'puppeteer';
import { CatalogLinks } from './data/getCatalogLinks';
import { Catalog } from './models/catalog';
import { getCatalogMaterials } from './data/catalog/getCatalogMaterials';
import { getCatalogFasteners } from './data/catalog/getCatalogFasteners';
import { getCatalogProcesses } from './data/catalog/getCatalogProcesses';
import { getCatalogMultipliers } from './data/catalog/getCatalogMultipliers';
import { getCatalogTools } from './data/catalog/getCatalogTools';


export async function fetchCatalog(page: Page, links: CatalogLinks): Promise<Catalog> {
  console.log('Fetching the full FSAEOnline catalog...');

  return {
    materials: await getCatalogMaterials(page, links.materialsUrl),
    fasteners: await getCatalogFasteners(page, links.fastenersUrl),
    processes: await getCatalogProcesses(page, links.processesUrl),
    processMultipliers: await getCatalogMultipliers(page, links.multipliersUrl),
    tools: await getCatalogTools(page, links.toolingUrl),
  };
}
