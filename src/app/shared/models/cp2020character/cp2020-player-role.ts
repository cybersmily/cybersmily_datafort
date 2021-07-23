import { Cp2020PlayerSkill } from '../../cp2020/cp2020-skills/models/cp2020-player-skill';
export class Cp2020PlayerRole {
  name: string;
  base: string;
  specialAbility: Cp2020PlayerSkill;
  skills: string[][];
  secondary?: any[];
  source: string;
  page: number;

  constructor() {
    this.name = '';
    this.base = '';
    this.specialAbility = new Cp2020PlayerSkill();
    this.specialAbility.isSA = true;
    this.specialAbility.isRoleSkill = true;
    this.skills = new Array();
    this.source = '';
    this.page = 0;
  }

  import(value: any) {
    this.name = (value.name) ? value.name : '';
    this.base = (value.base) ? value.base : '';
    this.specialAbility = new Cp2020PlayerSkill();
    if (value.specialAbility) {
      const sa = value.specialAbility;
      this.specialAbility.name = (sa.name) ? sa.name : '';
      this.specialAbility.description = (sa.description) ? sa.description : '';
      this.specialAbility.ipMod = (sa.ipMod) ? sa.ipMod : 0;
      this.specialAbility.stat = (sa.stat) ? sa.stat : 0;
      this.specialAbility.value = (sa.value) ? sa.value : 0;
      this.specialAbility.ip = (sa.ip) ? sa.ip : 0;
      this.specialAbility.isSA = true;
      this.specialAbility.isRoleSkill = true;
    }

    this.skills = (value.skills) ? value.skills : new Array();
    this.secondary = (value.secondary) ? value.secondary : undefined;
    this.source = (value.source) ? value.source : '';
    this.page = (value.page) ? value.page : 0;
  }
}
