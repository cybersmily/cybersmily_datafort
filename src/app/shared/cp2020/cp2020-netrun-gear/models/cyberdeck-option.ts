import { SourceBook } from '../../../models/sourcebook';
export interface CyberdeckOption {
  name: string;
  cost: number | string;
  slot?: number;
  slotType?: string;
  description: string;
  source: SourceBook;
  mods: any;
  count?: number;
}
