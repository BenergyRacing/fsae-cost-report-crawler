import * as fs from 'fs/promises';
import * as path from 'path';
import prompts from 'prompts';
import { crawl } from './crawl';
import { downloadFiles } from './downloadFiles';
import { getQueryStringParam, hasFileName } from './utils/url';
import { promptLogin } from './data/promptLogin';
import { convertPdfFilesToImages } from './tools/convertPdfFilesToImages/convertPdfFilesToImages';

(async () => {
  const page = await promptLogin();

  console.log(`Now, open a cost report to export.`);

  while (!hasFileName(page.url(), 'ListSystems.aspx')) {
    await page.waitForNavigation({ timeout: 0 });
  }

  const systemsUrl = page.url();

  const vehicleId = getQueryStringParam(systemsUrl, 'VehicleID') || '';

  const { pdfToImages } = await prompts([
    { type: 'toggle', name: 'pdfToImages', message: 'Convert PDF to Images?', initial: false },
  ]);

  console.log(`Starting to export ${vehicleId}...`);

  const cost = await crawl(page, vehicleId, systemsUrl);

  const vehicleDir = path.join('./out', vehicleId || 'export');
  await fs.mkdir(vehicleDir, { recursive: true });

  const costJsonPath = path.join(vehicleDir, 'cost-report.json');

  console.log(`Checking attachments to download...`);
  await downloadFiles(page, cost, vehicleDir);

  if (pdfToImages) {
    console.log(`Converting PDF to images...`);
    await convertPdfFilesToImages(cost, vehicleDir);
  }

  console.log(`Writing to file ${costJsonPath}...`);
  await fs.writeFile(costJsonPath, JSON.stringify(cost, null, 2));

  console.log(`Done!`);
  await page.browser().close();
})();
