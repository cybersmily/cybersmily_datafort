import { SourceBook } from './../../../models/sourcebook';
import { MartialBonuses } from './martial-bonuses';
export interface DataSkill {
  name: string;
  option?: string;
  stat: string;
  ipmod: number;
  source: SourceBook;
  sa: boolean;
  description: string;
  maBonuses?: MartialBonuses;
}
