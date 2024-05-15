
export interface Catalog {
  materials: CatalogMaterial[];
  fasteners: CatalogFastener[];
  processes: CatalogProcess[];
  processMultipliers: CatalogMultiplier[];
  tools: CatalogTool[];
}

export interface CatalogMaterial {
  id: string;
  imageUrl: string;
  title: string;
  supplier: string;
  category: string;
  unit1: string;
  unit2: string;
  cost: string;
  description: string;
}

export interface CatalogFastener {
  id: string;
  imageUrl: string;
  title: string;
  supplier: string;
  category: string;
  unit1: string;
  unit2: string;
  cost: string;
}

export interface CatalogProcess {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  unit1: string;
  toolingRequired: string;
  nearNetShape: string;
  processMultiplierType: string;
}

export interface CatalogMultiplier {
  id: string;
  title: string;
  type: string;
  description: string;
  multiplierValue: string;
}

export interface CatalogTool {
  id: string;
  imageUrl: string;
  title: string;
  unit: string;
  processTitle: string;
}
