import { CpRedSkillMod } from './cp-red-skill-mod';
export interface CpRedSkill {
  name: string;
  type: string;
  stat: string;
  base: number;
  level: number;
  modifiers: Array<CpRedSkillMod>;
  ipMod: number;
  option?: string;
  source: string;
  description: string;
}
