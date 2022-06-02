import { CpRedHitpoints } from './cp-red-hitpoints';
import { CpRedHumanity } from './cp-red-humanity';
import { CpRedStat } from './cp-red-stat';

export interface CpRedStats {
  int: CpRedStat;
  ref: CpRedStat;
  dex: CpRedStat;
  tech: CpRedStat;
  cool: CpRedStat;
  will: CpRedStat;
  luck: CpRedStat;
  move: CpRedStat;
  body: CpRedStat;
  emp: CpRedStat;
}
