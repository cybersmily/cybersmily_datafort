import { Cp2020StatBlock } from './../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { OppCyberware } from './../../cp2020/cp2020-cyberware/models/opp-cyberware';
import { Cp2020PlayerSkills, Cp2020PlayerSkill } from './../../cp2020/cp2020-skills/models';
import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models';
import { CpPlayerWeapon, CpPlayerWeaponList, Cp2020CombatModifiers } from './../../cp2020/cp2020weapons/models';
import { CmbtTrckOppTemplate } from './cmbt-trck-opp-template';
import { v4 as uuidv4 } from 'uuid';
import { CmbtTrckOppThreatCode } from './cmbt-trck-opp-threat-code';

export class CmbtTrckOpponent {
  name: string;
  role: string;
  id: number;
  initRoll: number;
  initDie: Array<number>;
  stats: Cp2020StatBlock;
  armor: Cp2020ArmorBlock;
  sa: Array<Cp2020PlayerSkill>;
  cyberware: Array<OppCyberware>;
  private _skills: Array<Cp2020PlayerSkill>;
  weapons: Array<CpPlayerWeapon>;
  selectedWeapon?: CpPlayerWeapon;
  gear: Array<string>;
  modifiers: Cp2020CombatModifiers;
  threatCode: CmbtTrckOppThreatCode;

  constructor(param?, newId?: boolean) {
    this.name = param?.name ?? '';
    this.role = param?.role ?? '';
    if (newId) {
      this.id = Number(uuidv4());
    } else {
      this.id = param?.id ?? uuidv4();
    }
    this.initRoll = param?.initRoll ?? 0;
    this.initDie = new Array<number>();
    this.stats = new Cp2020StatBlock();
    if (param?.stats) {
      this.stats.import(param.stats);
    }
    this.armor = new Cp2020ArmorBlock(param?.armor);
    this.stats.REF.ev = this.armor.ev;
    this.cyberware = param?.cyberware?.map(cyber => new OppCyberware(cyber)) ?? new Array<OppCyberware>();
    if(Array.isArray(param?.sa)) {
      this.sa = param.sa;
    } else {
      this.sa = [param?.sa ?? new Cp2020PlayerSkill()];
    }
    this._skills = param?._skills?.map(skill => new Cp2020PlayerSkill(skill)) ?? new Array<Cp2020PlayerSkill>();
    this.weapons = param?.weapons?.map(wpn => new CpPlayerWeapon(wpn)) ?? new Array<CpPlayerWeapon>();
    this.modifiers = new Cp2020CombatModifiers();
    if (param?.modifiers) {
      this.modifiers.target = param.modifiers.target;
      this.modifiers.attacker = param.modifiers.attacker;
    }
    this.gear = param?.gear?.map(g => g) ?? new Array<string>();
    this.threatCode = param?.threatCode ?? {skill: '', weapon: 0, armor: ''}
  }

  importTemplate(template: CmbtTrckOppTemplate) {
    this.name = template.handle;
    this.role = template.role;
    // import stats
    this.stats.INT.Base = template.int;
    this.stats.REF.Base = template.ref;
    this.stats.BODY.Base = template.body;
    this.stats.LUCK.Base = template.luck;
    this.stats.COOL.Base = template.cool;
    this.stats.TECH.Base = template.tech;
    this.stats.ATTR.Base = template.attr;
    this.stats.EMP.Base = template.emp;
    this.stats.MA.Base = template.ma;
    // import armor
    this.armor = new Cp2020ArmorBlock(template.armor);
    if(Array.isArray(template.sa)) {
      this.sa = template.sa?.map(sk=> new Cp2020PlayerSkill(sk)) ?? Array<Cp2020PlayerSkill>();
    } else {
      this.sa = [new Cp2020PlayerSkill(template.sa)];
    }

    template.skills.forEach((sk) => {
      this._skills.push(new Cp2020PlayerSkill(sk));
    });
    this.skills = this._skills;
    this.cyberware = template.cyberware;
    this.weapons = new Array<CpPlayerWeapon>();
    this.selectedWeapon = template?.selectedWeapon;
    template.weapons.forEach((w) => this.weapons.push(new CpPlayerWeapon(w)));
    this.gear = template.gear;
  }

  get combatSense(): number {
    return this.sa.find(sk => sk.name.toLowerCase() === 'combat sense')?.value ?? 0;
  }

  get skills(): Array<Cp2020PlayerSkill> {
    return this._skills;
  }

  set skills(skills: Array<Cp2020PlayerSkill>) {
    // filter the input list to be unique values.
    const list = skills.filter((sk, index) => {
      const found = skills.findIndex(
        (a) => a.name.toLowerCase() === sk.name.toLowerCase()
      );
      return index === found;
    });
    // set as a sorted list.
    this._skills = list.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  getSkillAsList() {
    const list = new Cp2020PlayerSkills();
    list.skills = this.skills;
    return list;
  }

  getWeaponsAsList() {
    const list = new CpPlayerWeaponList();
    list.items = this.weapons;
    return list;
  }

  addSkill(skill: Cp2020PlayerSkill) {
    if (
      !this._skills.some(
        (sk) => sk.name.toLowerCase() === skill.name.toLowerCase() && sk.option?.toLowerCase() === skill?.option?.toLowerCase()
      )
    ) {
      this._skills.push(skill);
    }
    this._skills.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  calculateInitiative(roll: Array<number>) {
    this.initDie = roll;
    this.initRoll = this.stats.REF.Adjusted;
    this.initRoll += this.stats.initiativeModifiers.reduce( (a, b) => a + b.mod, 0);
    this.initRoll += +this.initDie.reduce((a, b) => a + b, 0);
    this.initRoll += this.combatSense;
  }
}
