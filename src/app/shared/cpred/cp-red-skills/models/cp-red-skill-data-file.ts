import { CpRedSkillData } from './cp-red-skill-data';

export interface CpRedSkillDataFile {
  skillTypes: Array<string>;
  skillStats: Array<string>;
  skills: Array<CpRedSkillData>;
}
