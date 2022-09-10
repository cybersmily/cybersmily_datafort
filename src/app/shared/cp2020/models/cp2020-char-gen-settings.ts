import { Cp2020ContactSettings } from './../cp2020-contacts/models/cp2020-contact-settings';
import { Cp2020CyberdeckSettings } from './cp2020-cyberdeck-settings';
import { Cp2020CharGenSectionSettings } from './cp2020-char-gen-section-settings';
import { Cp2020SkillListSettings } from './../cp2020-skills/models/cp2020-skill-list-settings';
export class Cp2020CharGenSettings {
  isIU: boolean;
  isCollapsed: boolean;
  lifePathSource: string;
  lifePathEvents: boolean;
  lifePathYears: number;
  skillSettings: Cp2020SkillListSettings;
  sectionSettings: Cp2020CharGenSectionSettings;
  cyberdeckSettings: Cp2020CyberdeckSettings;
  contactSettings: Cp2020ContactSettings;

  constructor(param?: any) {
    this.isIU = param?.isIU || false;
    this.isCollapsed = param?.isCollapsed || false;
    this.lifePathSource = param?.lifePathSource || 'CP2020';
    this.lifePathEvents = param?.lifePathEvents || false;
    this.lifePathYears = param?.lifePathYears || 0;
    this.skillSettings = new Cp2020SkillListSettings(param?.skillSettings);
    this.sectionSettings = new Cp2020CharGenSectionSettings(
      param?.sectionSettings
    );
    this.cyberdeckSettings = new Cp2020CyberdeckSettings(
      param?.cyberdeckSettings
    );
    this.contactSettings = new Cp2020ContactSettings(param?.contactSettings);
  }
}
