import pathUtils from 'path';
import fs from 'fs/promises';
import { promptLogin } from '../../data/promptLogin';
import { hasFileName } from '../../utils/url';
import { CatalogLinks, getCatalogLinks } from '../../data/getCatalogLinks';
import { crawlCatalog } from './crawlCatalog';

(async function () {
  const page = await promptLogin();

  console.log(`Now, open the cost report system.`);

  while (!hasFileName(page.url(), 'ManageVehicles.aspx')) {
    await page.waitForNavigation({ timeout: 0 });
  }

  let links: CatalogLinks | undefined;

  while (true) {
    links = await getCatalogLinks(page);

    if (links)
      break;

    console.log('Could not find any catalog links :(');
    await page.waitForNavigation({ timeout: 0 });
  }

  const catalog = await crawlCatalog(page, links);

  const catalogDir = './out/catalog';
  const catalogPath = pathUtils.join(catalogDir, './catalog.json');

  console.log(`Saving the catalog at ${catalogPath}...`);
  await fs.mkdir(catalogDir, { recursive: true });
  await fs.writeFile(catalogPath, JSON.stringify(catalog, null, 4), 'utf8');

  console.log(`Done.`);
  await page.browser().close();
})();
