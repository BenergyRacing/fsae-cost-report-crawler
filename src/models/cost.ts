import { CostSystem } from './cost-system';
import { CostAttachment } from './cost-attachment';

export interface Cost {
  vehicleId: string;
  crawledAt: string;
  systems: CostSystem[];
  attachments?: CostAttachment[];
}
