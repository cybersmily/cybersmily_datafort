import { Background } from './background';
import { Career } from './career';
import { Stats } from './stats';
import { NpcSkill, Skill, SkillBlock } from '../../cp2020/cp2020-skills/models';

export interface iNpc {
  name: string;
  handle: string;
  aliases: string;
  age: number;
  img: string;
  career: Career;
  stats: Stats;
  skills: SkillBlock | string[] | Skill[] | NpcSkill[];
  background: Background;
  cyberware: string[];
  gear: string[];
  history: string;
  playerinfo?: string;
}
