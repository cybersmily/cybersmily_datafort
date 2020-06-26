import { SourceBook } from './../sourcebook';
import { DataSkill } from './../data/data-skill';
import { Skill } from '../character/skill';

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

  constructor(param?: SkillParameters) {
    if (param) {
      this.name = (param.name) ? param.name : '';
      this.description = (param.desc) ? param.desc : '';
      this.stat = (param.stat) ? param.stat : '';
      this.value = (param.value) ? param.value : 0;
      this.ip = (param.ip) ? param.ip : 0;
      this.ipMod = (param.ipmod) ? param.ipmod : 1;
      if (this.name.toLowerCase() === 'expert'
          || this.name.toLowerCase() === 'language'
          || this.name.toLowerCase() === 'other'
          || this.name.toLowerCase() === 'martial art') {
            this.option = (param.option) ? param.option : '';

      } else {
        this.option = undefined;
      }
      this.chipped = (param.chipped !== undefined && param.chipped !== null) ? param.chipped : false;
      this.isRoleSkill = (param.roleskill !== undefined && param.roleskill !== null) ? param.roleskill : false;
      this.isSecondarySkill = (param.secondarySkill !== undefined && param.secondarySkill !== null) ? param.secondarySkill : false;
      this.roleChoice = (param.ischoice !== undefined && param.ischoice !== null) ? param.ischoice : false;
      this.isSA = (param.sa !== undefined && param.sa !== null) ? param.sa : false;
      this.maBonuses = (param.maBonuses) ? param.maBonuses : undefined;
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
  ip?: number;
  sa?: boolean;
  roleskill?: boolean;
  secondarySkill?: boolean;
  option?: string;
  ischoice?: boolean;
  chipped?: boolean;
  maBonuses?: MartialBonuses;
}

export interface MartialBonuses {
  strike: number;
  kick: number;
  block: number;
  dodge: number;
  throw: number;
  hold: number;
  escape: number;
  choke: number;
  sweep: number;
  grapple: number;
}
