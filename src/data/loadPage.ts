import { Page } from 'puppeteer';
import { environment } from '../environment/environment';

export async function loadPage(page: Page, url: string): Promise<void> {
  const absoluteUrl = new URL(url, environment.baseUrl).href;

  await page.goto(absoluteUrl);
}
