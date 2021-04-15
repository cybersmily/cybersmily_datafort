import { Cp2020PlayerCyberList } from './../../cp2020/cp2020-cyberware/models';
import { Cp2020PlayerSkills } from './cp2020-player-skills';
import { LifePathResults } from './../lifepath/lifepath-results';
import { CpPlayerWeaponList } from './../../cp2020/cp2020weapons/models';
import { Cp2020PlayerGearList } from './cp2020-player-gear-list';
import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models';
import { Cp2020StatBlock } from '../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerRole } from './cp2020-player-role';

export class Cp2020PlayerCharacter {
  handle: string;
  role: Cp2020PlayerRole;
  stats: Cp2020StatBlock;
  armor: Cp2020ArmorBlock;
  cyberware: Cp2020PlayerCyberList;
  gear: Cp2020PlayerGearList;
  weapons: CpPlayerWeaponList;
  lifepath: LifePathResults;
  skills: Cp2020PlayerSkills;
  notes: string;
  image: string;

  constructor() {
    this.handle = '';
    this.role = new Cp2020PlayerRole();
    this.stats = new Cp2020StatBlock();
    this.armor = new Cp2020ArmorBlock();
    this.cyberware = new Cp2020PlayerCyberList(16);
    this.gear = new Cp2020PlayerGearList(25);
    this.weapons = new CpPlayerWeaponList(10);
    this.skills = new Cp2020PlayerSkills();
    this.lifepath = new LifePathResults();
    this.lifepath.events = Array.from({length: 12}, () => ({age: 0, event: ''}));
    this.notes = '';
    this.image = '';
  }
}
