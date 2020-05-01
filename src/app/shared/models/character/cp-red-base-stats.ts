import { CpRedBaseStat } from './cp-red-base-stat';
export class CpRedBaseStats {
  INT: CpRedBaseStat;
  WILL: CpRedBaseStat;
  COOL: CpRedBaseStat;
  EMP: CpRedBaseStat;
  TECH: CpRedBaseStat;
  REF: CpRedBaseStat;
  LUCK: CpRedBaseStat;
  BODY: CpRedBaseStat;
  DEX: CpRedBaseStat;
  MOVE: CpRedBaseStat;

  constructor() {
    this.INT = new CpRedBaseStat();
    this.WILL = new CpRedBaseStat();
    this.COOL = new CpRedBaseStat();
    this.EMP = new CpRedBaseStat();
    this.TECH = new CpRedBaseStat();
    this.REF = new CpRedBaseStat();
    this.LUCK = new CpRedBaseStat();
    this.BODY = new CpRedBaseStat();
    this.DEX = new CpRedBaseStat();
    this.MOVE = new CpRedBaseStat();
    this.INT.set(0);
    this.WILL.set(0);
    this.COOL.set(0);
    this.EMP.set(0);
    this.TECH.set(0);
    this.REF.set(0);
    this.LUCK.set(0);
    this.BODY.set(0);
    this.DEX.set(0);
    this.MOVE.set(0);
  }

  DeathSave(): number {
    return this.BODY.current;
  }

  StartingHP(): number {
    return this.BODY.base * 5;
  }

  WoundThreshold(): number {
    switch(this.BODY.adjusted) {
      case 2:
        return 5;
      case 3:
        return 8;
      case 4:
        return 10;
      case 5:
        return 13;
      case 6:
        return 15;
      case 7:
        return 18;
      case 8:
        return 20;
      case 9:
        return 23;
      case 10:
        return 25;
      default:
        return 0;
    }
  }
}
