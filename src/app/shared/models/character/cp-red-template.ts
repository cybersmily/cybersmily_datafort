import { BaseWeapon } from '../weapon';
import { CpRedTemplateStatBlock } from './cp-red-template-stat-block';
import { CpRedTemplateSkill } from './cp-red-template-skill';
import { CpRedTemplateArmor } from './cp-red-template-armor';
export interface CpRedTemplate {
    name: string;
    desc: string;
    stats: CpRedTemplateStatBlock[];
    skills: CpRedTemplateSkill[];
    armor: CpRedTemplateArmor;
    weapons: BaseWeapon[];
    cyberware: string[];
    gear: string[];
  }
