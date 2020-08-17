import { CpPlayerWeaponList } from './../weapon/cp-player-weapon-list';
import { Cp2020PlayerSkills } from './../cp2020character/cp2020-player-skills';
import { Cp2020ArmorBlock } from '../cp2020character/cp2020-armor-block';
import { OppCyberware } from '../cyberware';
import { CpPlayerWeapon } from '../weapon';
import { Cp2020PlayerSkill, Cp2020StatBlock } from '../cp2020character';
import { CmbtTrckOppTemplate } from './cmbt-trck-opp-template';
import { CombatModifiers } from './combat-modifiers';

export class CmbtTrckOpponent {
  name: string;
  role: string;
  initRoll: number;
  initDie: Array<number>;
  stats: Cp2020StatBlock;
  armor: Cp2020ArmorBlock;
  sa: Cp2020PlayerSkill;
  cyberware: Array<OppCyberware>;
  private _skills: Array<Cp2020PlayerSkill>;
  weapons: Array<CpPlayerWeapon>;
  gear: Array<string>;
  modifiers: CombatModifiers;

  constructor(param?) {
    this.name = param && param.name ? param.name : '';
    this.role = param && param.role ? param.role : '';
    this.initRoll = 0;
    this.initDie = new Array<number>();
    this.stats = new Cp2020StatBlock();
    if (param && param.stats) {
      this.stats.import(param.stats);
    }
    this.armor =
      param && param.armor
        ? new Cp2020ArmorBlock(param.armor)
        : new Cp2020ArmorBlock();
    this.stats.REF.ev = this.armor.ev;
    this.cyberware =
      param && param.cyberware ? param.cyberware : new Array<OppCyberware>();
    this.sa = param && param.sa ? param.sa : new Cp2020PlayerSkill();
    this._skills =
      param && param._skills ? param._skills : new Array<Cp2020PlayerSkill>();
    this.weapons = new Array<CpPlayerWeapon>();
    if (param && param.weapons) {
      param.weapons.forEach((w) => {
        this.weapons.push(new CpPlayerWeapon(w));
      });
    }
    this.modifiers = new CombatModifiers();
    if (param && param.modifiers) {
      this.modifiers.target = param.modifiers.target;
      this.modifiers.attacker = param.modifiers.attacker;
    }
    this.gear = param && param.gear ? param.gear : new Array<string>();
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
    this.armor.layers = template.armor.layers;
    this.sa = new Cp2020PlayerSkill(template.sa);
    template.skills.forEach((sk) => {
      this._skills.push(new Cp2020PlayerSkill(sk));
    });
    this.skills = this._skills;
    this.cyberware = template.cyberware;
    this.weapons = new Array<CpPlayerWeapon>();
    template.weapons.forEach((w) => this.weapons.push(new CpPlayerWeapon(w)));
    this.gear = template.gear;
  }

  get combatSense(): number {
    return this.sa &&
      this.sa.name &&
      this.sa.name.toLowerCase() === 'combat sense'
      ? this.sa.value
      : 0;
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
        (sk) => sk.name.toLowerCase() === skill.name.toLowerCase()
      )
    ) {
      this._skills.push(skill);
    }
    this._skills.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  calculateInitiative(roll: Array<number>) {
    this.initDie = roll;
    this.initRoll = this.stats.REF.Adjusted;
    this.initRoll += +this.initDie.reduce((a, b) => a + b, 0);
    this.initRoll += this.combatSense;
  }
}
