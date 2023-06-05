import { SkillListSettings } from './skill-list-settings';
export class Cp2020SkillListSettings implements SkillListSettings {
  roleSkillPoints: number = 40;
  availableSecondarySkillPoints: number = 0;
  useStatsForSecondary: boolean = true;
  showOnlySkillsWithRanks: boolean = false;
  ref: number = 0;
  int: number = 0;

  constructor(param?: any) {
    this.roleSkillPoints = param?.roleSkillPoints ?? 40;
    this.availableSecondarySkillPoints = param?.availableSecondarySkillPoints ?? 0;
    this.useStatsForSecondary = param?.useStatsForSecondary ?? true;
    this.showOnlySkillsWithRanks = param?.showOnlySkillsWithRanks ?? false;
    this.ref = param?.ref ?? 0;
    this.int = param?.int ?? 0;
  }

  get secondarySkillPoints(): number {
    if(this.useStatsForSecondary) {
      return this.ref + this.int;
    }
    return this.availableSecondarySkillPoints;
  }
}
