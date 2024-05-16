import { Page, Protocol } from 'puppeteer';
import prompts from 'prompts';
import { environment } from '../environment/environment';
import { hasFileName } from '../utils/url';
import { loadPage } from './loadPage';
import { createBrowser } from '../utils/browser';

export async function promptLogin(): Promise<Page> {
  console.log();
  console.log('Note: Keep an eye in the terminal, as future instructions will appear here.');
  console.log();

  const { authMethod } = await prompts([
    {
      type: 'toggle',
      name: 'authMethod',
      message: 'Authentication method',
      active: 'Login',
      inactive: 'Token',
      initial: true,
    },
  ]);

  if (authMethod)
    return await promptLoginMethod();
  else
    return await promptTokenMethod();
}

async function promptLoginMethod(): Promise<Page> {
  const page = await createBrowser();

  await loadPage(page, '/Login.aspx');

  console.log(`Please, login to your account.`);

  while (!hasFileName(page.url(), 'Default_NoFlash.aspx')) {
    await page.waitForNavigation({ timeout: 0 });
  }

  return page;
}

async function promptTokenMethod(): Promise<Page> {
  const { cookieCdsWeb, cookieAspSession } = await prompts([
    { type: 'text', name: 'cookieCdsWeb', message: 'Cookie ".SaeCdsWeb"' },
    { type: 'text', name: 'cookieAspSession', message: 'Cookie "ASP.NET_SessionId"' },
  ]);

  const page = await createBrowser();

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

  await loadPage(page, '/cdsweb/gen/Default_NoFlash.aspx');

  return page;
}
