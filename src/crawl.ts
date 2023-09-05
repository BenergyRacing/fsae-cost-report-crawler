import { Page } from 'puppeteer';
import { CostSystem, getSystems } from './data/getSystems';
import { getAssemblies } from './data/getAssemblies';
import { getBom, getPartBom } from './data/getBom';

export async function crawl(page: Page, systemsUrl: string): Promise<CostSystem[]> {
  console.log(`Fetching Systems of ${systemsUrl}...`);
  const systems = await getSystems(page, systemsUrl);

  for (const system of systems) {
    console.log(`Fetching Assemblies of ${system.name}...`);
    system.assemblies = await getAssemblies(page, system.manageUrl);

    for (const assembly of system.assemblies!) {
      console.log(`Fetching Assembly BOM of ${system.name} / ${assembly.title}...`);
      assembly.bom = await getBom(page, assembly.viewUrl);

      for (const part of assembly.bom!.parts) {
        console.log(`Fetching Part BOM of ${system.name} / ${assembly.title} / ${part.part}...`);
        part.partBom = await getPartBom(page, part.partBomUrl);
      }
    }
  }

  return systems;
}
