import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import * as path from 'path';
import { environment } from './environment/environment';
import { crawl } from './crawl';
import { downloadFiles } from './downloadFiles';
import { getQueryStringParam, hasFileName } from './utils/url';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

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

  const vehicleId = getQueryStringParam(systemsUrl, 'VehicleID') || '';

  console.log(`Starting to export ${vehicleId}...`);

  const cost = await crawl(page, vehicleId, systemsUrl);

  const vehicleDir = path.join('./out', vehicleId || 'export');
  await fs.mkdir(vehicleDir, { recursive: true });

  const costJsonPath = path.join(vehicleDir, 'cost-report.json');

  console.log(`Checking attachments to download...`);
  await downloadFiles(page, cost, vehicleDir);

  console.log(`Writing to file ${costJsonPath}...`);
  await fs.writeFile(costJsonPath, JSON.stringify(cost, null, 2));

  console.log(`Done!`);
  await browser.close();
})();
