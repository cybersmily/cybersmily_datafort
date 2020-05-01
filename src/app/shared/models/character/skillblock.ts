import { Skill } from './skill';
import { NpcSkill } from './npcskill';

export interface SkillBlock {
  attr: Skill[] | NpcSkill[];
  cool: Skill[] | NpcSkill[];
  emp: Skill[] | NpcSkill[];
  int: Skill[] | NpcSkill[];
  ref: Skill[] | NpcSkill[];
  tech: Skill[] | NpcSkill[];
}
