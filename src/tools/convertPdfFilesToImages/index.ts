import pathUtils from 'path';
import fs from 'fs/promises';
import { Cost } from '../../models/cost';
import prompts from 'prompts';
import { convertPdfFilesToImages } from './convertPdfFilesToImages';

(async function () {
  const { vehicleId } = await prompts([{ type: 'text', name: 'vehicleId', message: 'Vehicle ID' }]);

  const costDir = pathUtils.join('./out', vehicleId);
  const costPath = pathUtils.join(costDir, './cost-report.json');

  console.log(`Reading cost at ${costPath}...`);

  const costStr = await fs.readFile(costPath, 'utf8');
  const cost: Cost = JSON.parse(costStr);

  await convertPdfFilesToImages(cost, costDir);

  console.log(`Updating JSON file...`);
  await fs.writeFile(costPath, JSON.stringify(cost, null, 4), 'utf8');

  console.log(`Done.`);
})();
