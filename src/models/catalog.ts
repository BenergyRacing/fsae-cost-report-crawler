
export interface Catalog {
  materials: CatalogMaterial[];
  fasteners: CatalogFastener[];
  processes: CatalogProcess[];
  processMultipliers: CatalogMultiplier[];
  tools: CatalogTool[];
}

export interface CatalogMaterial {
  id: string;
  title: string;
  supplier: string;
  category: string;
  size1: string;
  size2: string;
  unit1: string;
  unit2: string;
  description: string;
  commonNamesLabel: string;
  commonNames: string;
  costFormula: string;
  c1: string;
  c2: string;
  obsolete: string;
  obsoleteComments: string;
}

export interface CatalogFastener {
  id: string;
  title: string;
  supplier: string;
  category: string;
  size1: string;
  size2: string;
  unit1: string;
  unit2: string;
  description: string;
  commonNamesLabel: string;
  commonNames: string;
  costFormula: string;
  c1: string;
  c2: string;
  obsolete: string;
  obsoleteComments: string;
}

export interface CatalogProcess {
  id: string;
  title: string;
  supplier: string;
  category: string;
  unit1: string;
  toolingRequired: string;
  nearNetShape: string;
  processMultiplierType: string;
  description: string;
  commonNamesLabel: string;
  commonNames: string;
  unitCost: string;
  obsolete: string;
  obsoleteComments: string;
}

export interface CatalogMultiplier {
  id: string;
  title: string;
  type: string;
  description: string;
  multiplierValue: string;
  obsolete: string;
  obsoleteComments: string;
}

export interface CatalogTool {
  id: string;
  title: string;
  process: string;
  unit: string;
  description: string;
  cost: string;
  obsolete: string;
  obsoleteComments: string;
}
