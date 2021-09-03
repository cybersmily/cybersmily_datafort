import { StatModifier } from './../../cp2020-stats/models/cp2020-stat';
import { MartialBonuses } from './martial-bonuses';

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
