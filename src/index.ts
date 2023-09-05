import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import { environment } from './environment/environment';
import { getQueryStringParam, hasFileName } from './utils/url';
import { crawl } from './crawl';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  /*await page.setCookie(...environment.cookies.map<Protocol.Network.CookieParam>(cookie => {
    return {
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      priority: 'Medium',
    };
  }));*/

  await page.setViewport({ width: 1080, height: 608 });

  await page.goto(`${environment.baseUrl}/Login.aspx`);

  console.log(`Please, login to your account.`);

  while (!hasFileName(page.url(), 'Default_NoFlash.aspx')) {
    await page.waitForNavigation({ timeout: 0 });
  }

  console.log(`Now, open a cost report to export.`);

  while (!hasFileName(page.url(), 'ListSystems.aspx')) {
    await page.waitForNavigation({ timeout: 0 });
  }

  const systemsUrl = page.url();

  const vehicleId = getQueryStringParam(systemsUrl, 'VehicleID');

  console.log(`Starting to export ${vehicleId}...`);

  const systems = await crawl(page, systemsUrl);

  console.log(`Writing to file out/${vehicleId}.json...`)
  await fs.writeFile(`./out/${vehicleId}.json`, JSON.stringify(systems, null, 2));

  console.log(`Done!`);
  await browser.close();
})();
