import { Page } from 'puppeteer';
import { Cost } from './models/cost';
import { getSystems } from './data/getSystems';
import { getAssemblies } from './data/getAssemblies';
import { getBom, getPartBom } from './data/getBom';
import { loadPage } from './data/loadPage';
import { getAttachments } from './data/getAttachments';
import { environment } from './environment/environment';

export async function crawl(page: Page, vehicleId: string, systemsUrl: string): Promise<Cost> {
  console.log(`Fetching Systems of ${systemsUrl}...`);
  await loadPage(page, systemsUrl);

  const systems = await getSystems(page);
  const systemsAttachments = await getAttachments(page);

  for (const system of systems) {
    console.log(`Fetching Assemblies of ${system.name}...`);
    await loadPage(page, system.manageUrl);

    system.assemblies = await getAssemblies(page);
    system.attachments = await getAttachments(page);

    for (const assembly of system.assemblies!) {
      console.log(`Fetching Assembly BOM of ${system.name} / ${assembly.title}...`);
      await loadPage(page, assembly.viewUrl);

      assembly.bom = await getBom(page);
      assembly.attachments = await getAttachments(page);

      for (const part of assembly.bom!.parts) {
        console.log(`Fetching Part BOM of ${system.name} / ${assembly.title} / ${part.part}...`);
        await loadPage(page, part.partBomUrl);

        part.partBom = await getPartBom(page);
        part.attachments = await getAttachments(page);
      }
    }
  }

  return {
    vehicleId: vehicleId,
    crawledAt: new Date().toISOString(),
    baseUrl: new URL(systemsUrl, environment.baseUrl).origin,
    systems: systems,
    attachments: systemsAttachments,
  };
}
