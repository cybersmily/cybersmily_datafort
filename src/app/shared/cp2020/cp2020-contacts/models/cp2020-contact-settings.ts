import { CpContactSettings } from './cp-contact-settings';
export class Cp2020ContactSettings implements CpContactSettings {
  showBigLeague: boolean;
  showHotStuff: boolean;
  showOthers: boolean;
  useSkill: string;
  skillLevelOverride: number;

  constructor(param?: any) {
    this.showBigLeague = param?.showBigLeague ?? true;
    this.showHotStuff = param?.showHotStuff ?? true;
    this.showOthers = param?.showOthers ?? true;
    this.useSkill = param?.useSkill ?? 'streetdeal';
    this.skillLevelOverride = param?.skillLevelOverride ?? null;
  }
}
