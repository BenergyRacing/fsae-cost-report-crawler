import { ElementHandle, Page } from 'puppeteer';
import { loadPage } from '../loadPage';
import { getCatalogItemsLinks } from './getCatalogItemsLinks';
import { getQueryStringParam } from '../../utils/url';

export async function getCatalogItems<T>(
  page: Page,
  url: string | undefined,
  queryStringId: string,
  getItem: (form: ElementHandle<HTMLFormElement>, id: string) => Promise<T>,
): Promise<T[]> {
  if (!url)
    return [];

  await loadPage(page, url);

  const urls = await getCatalogItemsLinks(page);
  const items: T[] = [];

  let index = 0;

  for (const url of urls) {
    index++;

    const id = getQueryStringParam(url, queryStringId) || '';

    console.log(`Parsing ${id} (${index} / ${urls.length})...`);

    await loadPage(page, url);

    const form = await page.waitForSelector('form');

    if (!form)
      continue;

    items.push(await getItem(form, id));
  }

  return items;
}
