import puppeteer, { Protocol } from 'puppeteer';
import * as fs from 'fs/promises';
import { environment } from './environment/environment';
import { getQueryStringParam, hasFileName } from './utils/url';
import { crawl } from './crawl';
import * as readline from 'readline';

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

  const vehicleId = getQueryStringParam(systemsUrl, 'VehicleID');

  const systems = await crawl(page, systemsUrl);

  console.log(`Writing to file ${vehicleId}.json...`)
  await fs.writeFile(`./out/${vehicleId}.json`, JSON.stringify(systems, null, 2));

  console.log(`Done!`);
  await browser.close();
})();
