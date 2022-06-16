import { CpRedStats } from './../c-p-red-stats/models';
import { cpRedRole } from './cp-red-character-sheet';

export interface CpRedCharacter {
  handle: string;
  aliases: string;
  notes: string;
  image: string;

  role: cpRedRole;

  stats: CpRedStats;

  humanity: number;
  wounds: number;
  deathsave: number;
  criticalInjuries: string;
  addictions: string;
  /*

  skills: Array<cpRedSkill>;

  ip: number;
  curIP: number;
  rep: number;
  repEvents: string;

  weapons: Array<cpRedWeapon>;
  gear: Array<cpRedGear>;
  cash: number;
  creadit: number;

  fashion: string;
  housing: string;
  rent: string;
  lifestyle: string;
  lifePath: cpRedLifePath;

  cyberware: cpRedCharacterCyberware;
  */
}
