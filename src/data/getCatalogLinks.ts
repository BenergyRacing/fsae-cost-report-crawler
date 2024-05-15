import { Page } from 'puppeteer';

export interface CatalogLinks {
  materialsUrl?: string;
  fastenersUrl?: string;
  processesUrl?: string;
  multipliersUrl?: string;
  toolingUrl?: string;
}

export async function getCatalogLinks(page: Page): Promise<CatalogLinks | undefined> {
  const panel = await page.waitForSelector('#content .panel');

  if (!panel)
    return undefined;

  return await panel.evaluate(parseCatalogLinks);
}

function parseCatalogLinks(panel: Element): CatalogLinks | undefined {
  const result: CatalogLinks = {};
  let hasResults: boolean = false;

  const links = panel.querySelectorAll<HTMLAnchorElement>('a.btn');

  links.forEach(link => {
    const href = link.href || '';

    if (href.includes('BrowseMaterials.aspx'))
      result.materialsUrl = href;
    else if (href.includes('BrowseFasteners.aspx'))
      result.fastenersUrl = href;
    else if (href.includes('BrowseProcesses.aspx'))
      result.processesUrl = href;
    else if (href.includes('BrowseProcessMultipliers.aspx'))
      result.multipliersUrl = href;
    else if (href.includes('BrowseTools.aspx'))
      result.toolingUrl = href;
    else
      return;

    hasResults = true;
  });

  if (!hasResults)
    return undefined;

  return result;
}
