import { CostAssembly } from './cost-assembly';
import { CostAttachment } from './cost-attachment';

export interface CostSystem {
  name: string;
  price: string;
  manageUrl: string;
  assemblies?: CostAssembly[];
  attachments?: CostAttachment[];
}
