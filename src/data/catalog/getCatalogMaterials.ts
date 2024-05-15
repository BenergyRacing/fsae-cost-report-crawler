import { Page } from 'puppeteer';
import { getCatalogItems } from './getCatalogItems';
import { CatalogMaterial } from '../../models/catalog';

interface RawCatalogMaterial {
  img: string;
  title: string;
  supplier: string;
  category: string;
  unit1: string;
  unit2: string;
  cost: string;
  description: string;
  actions: string;
}

export async function getCatalogMaterials(page: Page, url: string | undefined): Promise<CatalogMaterial[]> {
  const items = await getCatalogItems<RawCatalogMaterial>(page, url);

  return items.map(item => ({
    id: item.actions,
    title: item.title,
    description: item.description,
    supplier: item.supplier,
    category: item.category,
    unit1: item.unit1,
    unit2: item.unit2,
    cost: item.cost,
    imageUrl: item.img,
  }));
}
