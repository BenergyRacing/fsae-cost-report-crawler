import { Page } from 'puppeteer';
import { CatalogMultiplier, CatalogTool } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';

interface RawCatalogTool {
  img: string;
  title: string;
  unit: string;
  processTitle: string;
  actions: string;
}

export async function getCatalogTools(page: Page, url: string | undefined): Promise<CatalogTool[]> {
  const items = await getCatalogItems<RawCatalogTool>(page, url);

  return items.map(item => ({
    id: item.actions,
    title: item.title,
    unit: item.unit,
    processTitle: item.processTitle,
    imageUrl: item.img,
  }));
}
