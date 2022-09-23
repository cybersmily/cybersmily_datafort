import { Cp2020PlayerSkill } from './cp2020-player-skill';
export class Cp2020SkillUpdate {
  current: Cp2020PlayerSkill;
  update: Cp2020PlayerSkill;

  constructor(current: Cp2020PlayerSkill, update: Cp2020PlayerSkill) {
    this.current = current;
    this.update = update;
  }
}
