import { CostBom } from './cost-bom';
import { CostAttachment } from './cost-attachment';

export interface CostAssembly {
  title: string;
  partNumber: string;
  quantity: string;
  totalCost: string;
  viewUrl: string;

  bom?: CostBom;
  attachments?: CostAttachment[];
}
