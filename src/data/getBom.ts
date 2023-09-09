import { Page } from 'puppeteer';
import { CostAttachment } from './getAttachments';
import { parseTable } from '../utils/table';

export interface CostBom {
  parts: CostBomPart[];
  materials: CostBomMaterial[];
  processes: CostBomProcess[];
  fasteners: CostBomFastener[];
  tooling: CostBomTooling[];
}

export interface CostPartBom {
  materials: CostBomMaterial[];
  processes: CostBomProcess[];
  fasteners: CostBomFastener[];
  tooling: CostBomTooling[];
}

export interface CostBomPart {
  part: string;
  partNumber: string;
  opNum: string;
  partCost: string;
  quantity: string;
  subtotal: string;
  partBomUrl: string;
  partBom?: CostPartBom;
  attachments?: CostAttachment[];
}

export interface CostBomMaterial {
  material: string;
  use: string;
  opNum: string;
  size1: string;
  size2: string;
  areaName: string;
  area: string;
  length: string;
  density: string;
  quantity: string;
  unitCost: string;
  subtotal: string;
}

export interface CostBomProcess {
  process: string;
  use: string;
  opNum: string;
  quantity: string;
  multiplier: string;
  multiplierValue: string;
  unitCost: string;
  subtotal: string;
}

export interface CostBomFastener {
  fastener: string;
  use: string;
  opNum: string;
  size1: string;
  size2: string;
  quantity: string;
  unitCost: string;
  subtotal: string;
}

export interface CostBomTooling {
  tooling: string;
  use: string;
  opNum: string;
  quantity: string;
  pvf: string;
  fractionIncl: string;
  unitCost: string;
  subtotal: string;
}

export async function getBom(page: Page): Promise<CostBom> {
  return {
    parts: await getBomParts(page),
    materials: await getBomMaterials(page),
    processes: await getBomProcesses(page),
    fasteners: await getBomFasteners(page),
    tooling: await getBomTooling(page),
  };
}

export async function getPartBom(page: Page): Promise<CostPartBom> {
  return {
    materials: await getBomMaterials(page),
    processes: await getBomProcesses(page),
    fasteners: await getBomFasteners(page),
    tooling: await getBomTooling(page),
  };
}

async function getBomParts(page: Page): Promise<CostBomPart[]> {
  const table = await page.waitForSelector('#cost-table-parts table');
  const results = await table!.evaluate(parseTable);

  return results
    .filter(result => result['Part']?.text && result['Subtotal']?.text)
    .map(result => {
      return {
        part: result['Part']?.text,
        partNumber: result['Part #']?.text,
        opNum: result['Op Num']?.text,
        partCost: result['Part Cost']?.text,
        quantity: result['Quantity']?.text,
        subtotal: result['Subtotal']?.text,
        partBomUrl: result['']['Open Part BOM'],
      };
    });
}

async function getBomMaterials(page: Page): Promise<CostBomMaterial[]> {
  const table = await page.waitForSelector('#cost-table-materials table');
  const results = await table!.evaluate(parseTable);

  return results
    .filter(result => result['Material']?.text && result['Subtotal']?.text)
    .map(result => {
      return {
        material: result['Material']?.text,
        use: result['Use']?.text,
        opNum: result['Op Num']?.text,
        size1: result['Size 1']?.text,
        size2: result['Size 2']?.text,
        areaName: result['Area Name']?.text,
        area: result['Area']?.text,
        length: result['Length']?.text,
        density: result['Density']?.text,
        quantity: result['Quantity']?.text,
        unitCost: result['Unit Cost']?.text,
        subtotal: result['Subtotal']?.text,
      };
    });
}

async function getBomProcesses(page: Page): Promise<CostBomProcess[]> {
  const table = await page.waitForSelector('#cost-table-processes table');
  const results = await table!.evaluate(parseTable);

  return results
    .filter(result => result['Process']?.text && result['Subtotal']?.text)
    .map(result => {
      return {
        process: result['Process']?.text,
        use: result['Use']?.text,
        opNum: result['Op Num']?.text,
        quantity: result['Quantity']?.text,
        multiplier: result['Multiplier']?.text,
        multiplierValue: result['Mult. Val.']?.text,
        unitCost: result['Unit Cost']?.text,
        subtotal: result['Subtotal']?.text,
      };
    });
}

async function getBomFasteners(page: Page): Promise<CostBomFastener[]> {
  const table = await page.waitForSelector('#cost-table-fasteners table');
  const results = await table!.evaluate(parseTable);

  return results
    .filter(result => result['Fastener']?.text && result['Subtotal']?.text)
    .map(result => {
      return {
        fastener: result['Fastener']?.text,
        use: result['Use']?.text,
        opNum: result['Op Num']?.text,
        size1: result['Size 1']?.text,
        size2: result['Size 2']?.text,
        quantity: result['Quantity']?.text,
        unitCost: result['Unit Cost']?.text,
        subtotal: result['Subtotal']?.text,
      };
    });
}

async function getBomTooling(page: Page): Promise<CostBomTooling[]> {
  const table = await page.waitForSelector('#cost-table-tools table');
  const results = await table!.evaluate(parseTable);

  return results
    .filter(result => result['Tooling']?.text && result['Subtotal']?.text)
    .map(result => {
      return {
        tooling: result['Tooling']?.text,
        use: result['Use']?.text,
        opNum: result['Op Num']?.text,
        quantity: result['Quantity']?.text,
        pvf: result['PVF']?.text,
        fractionIncl: result['Fraction Incl.']?.text,
        unitCost: result['Unit Cost']?.text,
        subtotal: result['Subtotal']?.text,
      };
    });
}
