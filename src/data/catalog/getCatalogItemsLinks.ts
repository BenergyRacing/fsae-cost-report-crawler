import { Page } from 'puppeteer';

export async function getCatalogItemsLinks(page: Page): Promise<string[]> {
  let links: string[] = [];

  do {
    const results = await getViewButtons(page);

    links = [...links, ...results];
  } while (await nextDataTablePage(page));

  return links;
}

async function getViewButtons(page: Page): Promise<string[]> {
  const table = await page.waitForSelector('#content table');

  if (!table)
    return [];

  return await table.evaluate(parseViewButtons);
}

function parseViewButtons(table: HTMLTableElement): string[] {
  const buttons = table.querySelectorAll<HTMLAnchorElement>('a.btn.btn-primary');
  const links: string[] = [];

  buttons.forEach(button => {
    if (button.innerText !== 'View')
      return;

    links.push(button.href);
  });

  return links;
}

async function nextDataTablePage(page: Page): Promise<boolean> {
  const next = await page.waitForSelector('#content a.paginate_button.next');

  if (!next)
    return false;

  const isDisabled = await next.evaluate(el => el.classList.contains('disabled'));

  if (isDisabled)
    return false;

  await next.click();

  return true;
}
