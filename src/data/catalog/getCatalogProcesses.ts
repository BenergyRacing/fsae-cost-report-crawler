import { Page } from 'puppeteer';
import { CatalogFastener, CatalogProcess } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';

interface RawCatalogProcess {
  img: string;
  title: string;
  category: string;
  unit1: string;
  toolingReq: string;
  nearNetShape: string;
  procMultType: string;
  actions: string;
}

export async function getCatalogProcesses(page: Page, url: string | undefined): Promise<CatalogProcess[]> {
  const items = await getCatalogItems<RawCatalogProcess>(page, url);

  return items.map(item => ({
    id: item.actions,
    title: item.title,
    category: item.category,
    unit1: item.unit1,
    toolingRequired: item.toolingReq,
    nearNetShape: item.nearNetShape,
    processMultiplierType: item.procMultType,
    imageUrl: item.img,
  }));
}
