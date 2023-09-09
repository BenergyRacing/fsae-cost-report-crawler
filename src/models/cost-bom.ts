import { CostAttachment } from './cost-attachment';

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
