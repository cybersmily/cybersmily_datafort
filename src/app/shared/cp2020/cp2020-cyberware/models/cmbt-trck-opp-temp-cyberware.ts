import { CmbtTrckEntry } from '../../../models/cmbt-trck/cmbt-trck-entry';
export interface CmbtTrckOppTempCyberware extends CmbtTrckEntry {
  name: string;
  notes?: string;
  options?: Array<string>;
}
