import { Cp2020PlayerSkill } from '../../cp2020-skills/models/cp2020-player-skill';
export class Cp2020PlayerRole {
  name: string;
  base: string;
  specialAbility: Cp2020PlayerSkill;
  skills: string[];
  salary?: number;
  secondary?: any[];
  source: string;
  page: number;

  constructor(param?: any) {
    if (param) {
      this.import(param);
    } else {
      this.name = '';
      this.base = '';
      this.specialAbility = new Cp2020PlayerSkill();
      this.specialAbility.isSA = true;
      this.specialAbility.isRoleSkill = true;
      this.skills = new Array();
      this.source = '';
      this.salary = 0;
      this.page = 0;
    }
  }

  import(value: any) {
    if (value) {
      this.name = value.name || '';
      this.base = value.base || '';
      this.specialAbility = new Cp2020PlayerSkill();
      const sa = value.specialAbility || value.specialability;
      this.setSpecialAbility(sa);
      this.skills = value.skills?.map(sk => sk) || new Array();
      this.salary = value.salary || 0;
      this.secondary = value.secondary;
      this.source = value.source || '';
      this.page = value.page || 0;
    }
  }

  private setSpecialAbility(sa) {
    this.specialAbility.name = sa?.name || '';
    this.specialAbility.description = sa?.description || '';
    this.specialAbility.ipMod = sa?.ipMod || 0;
    this.specialAbility.stat = sa?.stat || 0;
    this.specialAbility.value = sa?.value || 0;
    this.specialAbility.ip = sa?.ip || 0;
    this.specialAbility.isSA = true;
    this.specialAbility.isRoleSkill = true;
  }
}
