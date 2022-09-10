import { Cp2020PlayerContacts } from './../../cp2020/cp2020-contacts/models/cp2020-player-contacts';
import { Cp2020CyberdeckManager } from './../../cp2020/cp2020-netrun-gear/models/cp2020-cyberdeck-manager';
import { Cp2020Vehicle } from './../../cp2020/cp2020-vehicles/models/cp2020-vehicle';
import { Cp2020PlayerCyberList } from './../../cp2020/cp2020-cyberware/models';
import { Cp2020PlayerSkills } from './../../cp2020/cp2020-skills/models';
import { LifePathResults } from './../../cp2020/cp2020-lifepath/models';
import { CpPlayerWeaponList } from './../../cp2020/cp2020weapons/models';
import { Cp2020PlayerGearList } from './cp2020-player-gear-list';
import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models';
import { Cp2020StatBlock } from '../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerRole } from '../../cp2020/cp2020-role/models/cp2020-player-role';
import {
  Cp2020Lifestyle,
  Cp2020Credchip,
  CpHousing,
  Cp2020Services,
  Cp2020Food,
  Cp2020Identity,
} from '../../cp2020/cp2020-lifestyle/models';

export class Cp2020PlayerCharacter {
  handle: string;
  role: Cp2020PlayerRole;
  secondaryRoles: Array<Cp2020PlayerRole>;
  stats: Cp2020StatBlock;
  armor: Cp2020ArmorBlock;
  cyberware: Cp2020PlayerCyberList;
  gear: Cp2020PlayerGearList;
  weapons: CpPlayerWeaponList;
  vehicles: Array<Cp2020Vehicle>;
  cyberdeckPrograms: Cp2020CyberdeckManager;
  lifepath: LifePathResults;
  contacts: Cp2020PlayerContacts;
  lifeStyle: Cp2020Lifestyle;
  skills: Cp2020PlayerSkills;
  notes: string;
  image: string;
  isIU: boolean;

  constructor(isIU?: boolean) {
    this.handle = '';
    this.role = new Cp2020PlayerRole();
    this.secondaryRoles = new Array<Cp2020PlayerRole>();
    this.stats = new Cp2020StatBlock(isIU);
    this.armor = new Cp2020ArmorBlock();
    this.cyberware = new Cp2020PlayerCyberList(4);
    this.gear = new Cp2020PlayerGearList(24);
    this.vehicles = new Array<Cp2020Vehicle>();
    this.cyberdeckPrograms = new Cp2020CyberdeckManager();
    this.weapons = new CpPlayerWeaponList(3);
    this.skills = new Cp2020PlayerSkills();
    this.lifepath = new LifePathResults();
    this.lifeStyle = {
      cash: 0,
      credchips: new Array<Cp2020Credchip>(),
      debt: 0,
      salary: 0,
      housing: new Array<CpHousing>(),
      services: new Array<Cp2020Services>(),
      food: new Array<Cp2020Food>(),
      identities: new Array<Cp2020Identity>(),
    };
    this.lifepath.events = Array.from({ length: 12 }, () => ({
      age: 0,
      event: '',
    }));
    this.contacts = new Cp2020PlayerContacts();
    this.notes = '';
    this.image = '';
    this.isIU = isIU ?? false;
  }
}
