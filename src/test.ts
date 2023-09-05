import puppeteer, { Protocol } from 'puppeteer';
import * as fs from 'fs/promises';
import * as readline from 'readline';
import * as path from 'path';
import { environment } from './environment/environment';
import { crawl } from './crawl';
import { getQueryStringParam } from './utils/url';
import { downloadFiles } from './downloadFiles';

const rl = readline.createInterface(process.stdin, process.stdout);

function question(text: string): Promise<string> {
  return new Promise(resolve => rl.question(text, resolve));
}

(async () => {
  const cookieCdsWeb = await question('Cookie ".SaeCdsWeb": ');
  const cookieAspSession = await question('Cookie "ASP.NET_SessionId": ');
  const systemsUrl = await question('"ListSystems.aspx" URL: ');

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const baseCookie: Partial<Protocol.Network.CookieParam> = {
    domain: new URL(environment.baseUrl).hostname,
    path: '/',
    httpOnly: true,
    sameSite: 'Lax',
    priority: 'Medium',
  };

  await page.setCookie({
    ...baseCookie,
    name: '.SaeCdsWeb',
    value: cookieCdsWeb,
  }, {
    ...baseCookie,
    name: 'ASP.NET_SessionId',
    value: cookieAspSession,
  });

  await page.setViewport({ width: 1080, height: 608 });

  const vehicleId = getQueryStringParam(systemsUrl, 'VehicleID') || '';

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
