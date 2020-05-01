import { Background } from './background';
import { Skill } from './skill';
import { SkillBlock } from './skillblock';
import { Career } from './career';
import { Stats } from './stats';
import { NpcSkill } from './npcskill';

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
