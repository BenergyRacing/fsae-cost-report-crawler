import puppeteer, { Page } from 'puppeteer';

export async function createBrowser(): Promise<Page> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 608 });

  return page;
}
