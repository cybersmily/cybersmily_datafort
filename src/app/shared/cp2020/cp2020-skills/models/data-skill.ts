import { MartialBonuses } from './martial-bonuses';
export interface DataSkill {
  name: string;
  option?: string;
  stat: string;
  ipmod: number;
  source: string;
  page: number;
  sa: boolean;
  description: string;
  maBonuses?: MartialBonuses
}
