import { SourceBook } from '../../../models/sourcebook';
import { DataSkill } from '../../../models/data/data-skill';
import { Skill } from '../../../models/character/skill';
import { StatModifier } from '../../cp2020-stats/models';

export class Cp2020PlayerSkill implements Skill {
  name: string;
  description?: string;
  stat: string;
  value: number;
  ipMod?: number;
  ip?: number;
  isSA?: boolean;
  option?: string;
  roleChoice?: boolean;
  isRoleSkill?: boolean;
  isSecondarySkill?: boolean;
  chipped?: boolean;
  maBonuses?: MartialBonuses;
  modifiers?: Array<StatModifier>;

  constructor(param?: SkillParameters) {
    if (param) {
      this.name = (param.name) ? param.name : '';
      this.description = (param.desc) ? param.desc : '';
      this.stat = (param.stat) ? param.stat : '';
      this.value = (param.value) ? param.value : 0;
      this.ip = (param.ip) ? param.ip : 0;
      this.ipMod = (param.ipMod) ? param.ipMod : (param.ipmod) ? param.ipmod : 1;
      if (this.name.toLowerCase() === 'expert'
          || this.name.toLowerCase() === 'language'
          || this.name.toLowerCase() === 'other'
          || this.name.toLowerCase() === 'martial art'
          || this.name.toLowerCase() === 'pilot') {
            this.option = (param.option) ? param.option : '';

      } else {
        this.option = (param.option) ? param.option : undefined;
      }
      this.chipped = (param.chipped !== undefined && param.chipped !== null) ? param.chipped : false;
      this.isRoleSkill = (param.roleskill !== undefined && param.roleskill !== null) ? param.roleskill : (param.isRoleSkill !== undefined && param.isRoleSkill !== null) ? param.isRoleSkill : false;
      this.isSecondarySkill = (param.secondarySkill !== undefined && param.secondarySkill !== null) ? param.secondarySkill : false;
      this.roleChoice = (param.ischoice !== undefined && param.ischoice !== null) ? param.ischoice : (param.roleChoice !== undefined && param.roleChoice !== null) ? param.roleChoice : false;
      this.isSA = (param.sa !== undefined && param.sa !== null) ? param.sa : (param.isSA !== undefined && param.isSA !== null) ? param.isSA :false;
      this.maBonuses = (param.maBonuses) ? param.maBonuses : undefined;
      this.modifiers = param.modifiers ? param.modifiers : new Array<StatModifier>();
    } else {
      this.name = '';
      this.stat = '';
      this.value = 0;
      this.ipMod = 1;
    }

  }

  toDataSkill(): DataSkill {
    return {
      name: this.name,
      stat: this.stat,
      isspecialability: (this.isSA) ? this.isSA : false,
      ipmod : this.ipMod,
      description: (this.description) ? this.description : '',
      source: '',
      page: 0
    };
  }

  fromDataSkill(skill: DataSkill) {
    this.name = skill.name;
    this.isSA = skill.isspecialability;
    this.description = skill.description;
    this.ipMod = skill.ipmod;
    this.stat = skill.stat.toUpperCase();
  }
}

export interface SkillParameters {
  name?: string;
  desc?: string;
  stat?: string;
  value?: number;
  ipmod?: number;
  ipMod?: number;
  ip?: number;
  sa?: boolean;
  isSA?: boolean;
  roleskill?: boolean;
  isRoleSkill?: boolean;
  secondarySkill?: boolean;
  option?: string;
  roleChoice?: boolean;
  ischoice?: boolean;
  chipped?: boolean;
  maBonuses?: MartialBonuses;
  modifiers?: Array<StatModifier>;
}

export class MartialBonuses {
  strike: number;
  kick: number;
  punch: number;
  block: number;
  dodge: number;
  disarm: number;
  throw: number;
  hold: number;
  escape: number;
  choke: number;
  sweep: number;
  grapple: number;
  ram: number;

  constructor() {
    this.strike = 0;
    this.kick = 0;
    this.punch = 0;
    this.block = 0;
    this.dodge = 0;
    this.disarm = 0;
    this.throw = 0;
    this.hold = 0;
    this.escape = 0;
    this.choke = 0;
    this.sweep = 0;
    this.grapple = 0;
    this.ram = 0;
  }
}
