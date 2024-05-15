import { Page } from 'puppeteer';
import { loadPage } from '../loadPage';

export async function getCatalogItems<T>(page: Page, url: string | undefined): Promise<T[]> {
  if (!url)
    return [];

  await loadPage(page, url);

  const code = await page.evaluate(parseCatalogItemsCode);

  return await page.evaluate<[], () => T[]>(code);
}

function parseCatalogItemsCode(): string {
  const scripts = document.querySelectorAll('script');
  let itemsCode = '';

  scripts.forEach(script => {
    const code = script.innerText;

    if (!code)
      return;

    const regex = /items\.push\({(.*?)}\);/g;

    let m: RegExpExecArray | null;
    while ((m = regex.exec(code)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      itemsCode += m[0] + '\n';
    }
  });

  if (!itemsCode)
    return itemsCode;

  return '(function() { let items = [];\n' + itemsCode + '\nreturn items; })()';
}
