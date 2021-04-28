import { CpRedStat, CpRedCharacterStat } from './cp-red-stat';

export interface CpRedStats {
  int: CpRedCharacterStat;
  ref: CpRedCharacterStat;
  dex: CpRedCharacterStat;
  tech: CpRedCharacterStat;
  cool: CpRedCharacterStat;
  will: CpRedCharacterStat;
  luck: CpRedCharacterStat;
  move: CpRedCharacterStat;
  body: CpRedCharacterStat;
  emp: CpRedCharacterStat;
  humanity: number;
  hitPoints: number;
  deathsave: number;
}


export class CpRedCharacterStats implements CpRedStats{
  int: CpRedCharacterStat;
  ref: CpRedCharacterStat;
  dex: CpRedCharacterStat;
  tech: CpRedCharacterStat;
  cool: CpRedCharacterStat;
  will: CpRedCharacterStat;
  luck: CpRedCharacterStat;
  move: CpRedCharacterStat;
  body: CpRedCharacterStat;
  emp: CpRedCharacterStat;
  _humanity: number;
  hitPoints: number;
  deathsave: number;

  constructor(stats?: CpRedStats){
    this.int = (stats) ? new CpRedCharacterStat(stats.int): new CpRedCharacterStat();
    this.ref = (stats) ? new CpRedCharacterStat(stats.ref): new CpRedCharacterStat();
    this.dex = (stats) ? new CpRedCharacterStat(stats.dex): new CpRedCharacterStat();
    this.tech = (stats) ? new CpRedCharacterStat(stats.tech): new CpRedCharacterStat();
    this.cool = (stats) ? new CpRedCharacterStat(stats.cool): new CpRedCharacterStat();
    this.will = (stats) ? new CpRedCharacterStat(stats.will): new CpRedCharacterStat();
    this.luck = (stats) ? new CpRedCharacterStat(stats.luck): new CpRedCharacterStat();
    this.move = (stats) ? new CpRedCharacterStat(stats.move): new CpRedCharacterStat();
    this.body = (stats) ? new CpRedCharacterStat(stats.body): new CpRedCharacterStat();
    this.emp = (stats) ? new CpRedCharacterStat(stats.emp): new CpRedCharacterStat();
  }

  get humanity(): number {
    return this.emp.modified * 10;
  }
}
