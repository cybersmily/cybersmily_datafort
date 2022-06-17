import { CpRedSkillMod } from './cp-red-skill-mod';
import { CpRedSkill } from './cp-red-skill';

export class CpRedCharacterSkill implements CpRedSkill {
  name: string;
  type: string;
  stat: string;
  base: number;
  modified: number;
  modifiers: Array<CpRedSkillMod>;
  source: string;
  description: string;
  required: boolean;
  ipMod?: number;
  option?: string;

  constructor() {}
}
