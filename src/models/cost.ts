import { CostSystem } from './cost-system';
import { CostAttachment } from './cost-attachment';
import { Catalog } from './catalog';

export interface Cost {
  vehicleId: string;
  crawledAt: string;
  baseUrl: string;
  systems: CostSystem[];
  attachments?: CostAttachment[];
  catalog?: Catalog;
}
