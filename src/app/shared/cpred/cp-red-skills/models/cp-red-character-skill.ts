import { CpRedSkillMod } from './cp-red-skill-mod';
import { CpRedSkill } from './cp-red-skill';

export class CpRedCharacterSkill implements CpRedSkill {
  name: string;
  type: string;
  stat: string;
  base: number;
  level: number;
  modifiers: Array<CpRedSkillMod>;
  source: string;
  description: string;
  required: boolean;
  ipMod: number;
  option?: string;
  isChipped?: boolean;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.type = param?.type ?? '';
    this.stat = param?.stat ?? '';
    this.base = param?.base ?? 0;
    this.modifiers =
      param?.modifiers?.map((mod: CpRedSkillMod) => ({ ...mod })) ??
      new Array<CpRedSkillMod>();
    this.source = param?.source ?? '';
    this.description = param?.description ?? '';
    this.required = param?.required ?? false;
    if (this.required && this.base < 2) {
      this.base = 2;
    }
    this.ipMod = param?.ipMod ?? 1;
    this.option = param?.option ?? undefined;
    this.isChipped = param?.isChipped ?? false;
    this.level =
      this.modifiers.reduce((a, b) => a + (b.active ? b.value : 0), 0) +
      this.base;
  }
}
