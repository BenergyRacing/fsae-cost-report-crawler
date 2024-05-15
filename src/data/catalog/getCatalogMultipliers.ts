import { Page } from 'puppeteer';
import { CatalogMultiplier, CatalogProcess } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';

interface RawCatalogMultiplier {
  title: string;
  type: string;
  descr: string;
  multVal: string;
  actions: string;
}

export async function getCatalogMultipliers(page: Page, url: string | undefined): Promise<CatalogMultiplier[]> {
  const items = await getCatalogItems<RawCatalogMultiplier>(page, url);

  return items.map(item => ({
    id: item.actions,
    title: item.title,
    type: item.type,
    description: item.descr,
    multiplierValue: item.multVal,
  }));
}
