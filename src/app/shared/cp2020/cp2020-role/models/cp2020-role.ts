import { Cp2020Skill } from './../../cp2020-skills/models/cp2020-skill';
export class Cp2020Role {
  name: string;
  base: string;
  specialability: Cp2020Skill;
  skills: any[];
  secondary?: any[];
  source: string;
  page: number;
  salary: number[];

  constructor() {
    this.name = '';
    this.base = '';
    this.specialability = new Cp2020Skill();
    this.skills = new Array();
    this.source = '';
    this.page = 0;
  }
}
