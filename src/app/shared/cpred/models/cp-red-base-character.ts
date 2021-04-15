import { CPRedLifepath } from './cpred-lifepath';
import { BaseWeapon } from './base-weapon';
import { CpRedBaseStats } from './cp-red-base-stats';
import { CpRedTemplateArmor } from './cp-red-template-armor';
export class CpRedBaseCharacter {
  name: string;
  role: string;
  stats: CpRedBaseStats;
  skills: any[];
  armor: CpRedTemplateArmor;
  weapons: BaseWeapon[];
  cyberware: string[];
  gear: string[];
  lifepath: CPRedLifepath;

  constructor() {
    this.name = '';
    this.role = '';
    this.stats = new CpRedBaseStats();
    this.skills = new Array();
    this.armor = {name: '', head: 0, body: 0};
    this.weapons = new Array<BaseWeapon>();
    this.cyberware = new Array<string>();
    this.gear = new Array<string>();
    this.lifepath = new CPRedLifepath();
  }
}
