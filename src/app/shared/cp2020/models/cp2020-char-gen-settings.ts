import { Cp2020SkillListSettings } from './../cp2020-skills/models/cp2020-skill-list-settings';
export class Cp2020CharGenSettings {
  isIU: boolean;
  isCollapsed: boolean;
  lifePathSource: string;
  lifePathEvents: boolean;
  lifePathYears: number;
  skillSettings: Cp2020SkillListSettings;

  constructor(param?:any) {
    this.isIU = param?.isIU || false;
    this.isCollapsed = param?.isCollapsed || false;
    this.lifePathSource = param?.lifePathSource || 'CP2020';
    this.lifePathEvents = param?.lifePathEvents || false;
    this.lifePathYears = param?.lifePathYears || 0;
    this.skillSettings = new Cp2020SkillListSettings(param?.skillSettings);
  }
}
