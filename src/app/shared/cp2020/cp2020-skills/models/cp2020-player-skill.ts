import { MartialBonuses } from './martial-bonuses';
import { DataSkill } from '../../../models/data/data-skill';
import { Skill } from '../../../models/character/skill';
import { StatModifier } from '../../cp2020-stats/models';
import { SkillParameters } from './skill-parameters';

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

  get totalModifiers(): number {
    if (this.modifiers) {
      return this.modifiers.reduce( (a, b) => a + b.mod, 0);
    }
    return 0;
  }

  constructor(param?: SkillParameters) {
    if (param) {
      this.name = (param.name) ? param.name.replace('\\&','&') : '';
      this.description = param?.desc ?? '';
      this.stat = param?.stat ?? '';
      this.value = param?.value ?? 0;
      this.ip = param?.ip ?? 0;
      this.ipMod = param?.ipMod ?? param?.ipmod ?? 1;
      if (this.name.toLowerCase() === 'expert'
          || this.name.toLowerCase() === 'language'
          || this.name.toLowerCase() === 'other'
          || this.name.toLowerCase() === 'martial art'
          || this.name.toLowerCase() === 'pilot') {
            this.option = (param.option) ? param.option : '';

      } else {
        this.option = param?.option ?? undefined;
      }
      this.chipped = param?.chipped ?? false;
      this.isRoleSkill = param?.roleskill ?? param?.isRoleSkill ?? false;
      this.isSecondarySkill = param?.secondarySkill ?? false;
      this.roleChoice = param?.ischoice ?? param?.roleChoice ?? false;
      this.isSA = param?.sa ?? param?.isSA ?? false;
      this.maBonuses = param?.maBonuses ?? undefined;
      this.modifiers = param?.modifiers ?? new Array<StatModifier>();
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
      sa: (this.isSA) ? this.isSA : false,
      ipmod : this.ipMod,
      description: (this.description) ? this.description : '',
      source: '',
      page: 0
    };
  }

  fromDataSkill(skill: DataSkill) {
    this.name = skill.name;
    this.isSA = skill.sa;
    this.description = skill.description;
    this.ipMod = skill.ipmod;
    this.stat = skill.stat.toUpperCase();
  }
}

