import { CatalogFastener } from '../../models/catalog';
import { getCatalogItems } from './getCatalogItems';
import { Page } from 'puppeteer';

interface RawCatalogFastener {
  img: string;
  title: string;
  supplier: string;
  category: string;
  unit1: string;
  unit2: string;
  cost: string;
  actions: string;
}

export async function getCatalogFasteners(page: Page, url: string | undefined): Promise<CatalogFastener[]> {
  const items = await getCatalogItems<RawCatalogFastener>(page, url);

  return items.map(item => ({
    id: item.actions,
    title: item.title,
    supplier: item.supplier,
    category: item.category,
    unit1: item.unit1,
    unit2: item.unit2,
    cost: item.cost,
    imageUrl: item.img,
  }));
}
