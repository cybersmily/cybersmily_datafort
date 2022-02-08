import { DataSkill } from './data-skill';
import { Cp2020PlayerSkill } from './cp2020-player-skill';
export class Cp2020PlayerSkills {
  RoleTotal: number;
  OtherTotal: number;
  skills: Array<Cp2020PlayerSkill>;

  rep: number;
  ip: number;

  constructor(dataList?: Array<DataSkill>, includeOther?: boolean) {
    this.skills = new Array<Cp2020PlayerSkill>();
    this.initiateSkills(dataList, includeOther);
    this.RoleTotal = 0;
    this.OtherTotal = 0;
    this.rep = 1;
    this.ip = 0;
  }

  import(playerSkills:Cp2020PlayerSkills) {
    this.RoleTotal = playerSkills.RoleTotal;
    this.OtherTotal = playerSkills.OtherTotal;
    this.rep = playerSkills.rep;
    this.ip = playerSkills.ip;
    this.importSkills(playerSkills.skills);
    this.calculateTotals();
  }


  importSkills(skills: Array<Cp2020PlayerSkill>, roleSkills?: any[]) {
    skills.forEach(skill => {
      const sk = new Cp2020PlayerSkill(skill);
      const i = this.skills.findIndex(s => s.name === skill.name && s.option === skill.option);
      if (i > -1) {
        sk.ipMod = this.skills[i].ipMod;
        sk.stat = this.skills[i].stat;
        this.skills[i] = sk;
      } else {
        this.skills.push(sk);
      }
    });
    if (roleSkills) {
      this.setRoleSkills(roleSkills);
    }
  }

  private initiateSkills(skillList?: Array<DataSkill>, includeOther?: boolean) {
    if (skillList) {
      skillList.forEach(sk => {
        this.skills.push(new Cp2020PlayerSkill(sk));
      });
    }
    // Other
    if (includeOther) {
      for (let i = 0; i < 7; i++) {
        this.skills.push(new Cp2020PlayerSkill({ name: 'Other', option: '', ipmod: 1, stat: '' }));
      }
    }

  }

  get SkillsWithValues(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(skill => skill.value > 0);
  }

  get specialAbilites(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => sk.isSA);
  }

  get ATTR(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => sk.stat && sk.stat.toLowerCase() === 'attr' && !sk.isSA);
  }

  get BODY(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => sk.stat && sk.stat.toLowerCase() === 'body' && !sk.isSA);
  }

  get COOL(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat && sk.stat.toLowerCase() === 'cool' && !sk.isSA);
  }

  get EMP(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat && sk.stat.toLowerCase() === 'emp' && !sk.isSA);
  }

  get INT(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat && sk.stat.toLowerCase() === 'int' && !sk.isSA);
  }

  get REF(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => sk.stat && sk.stat.toLowerCase() === 'ref' && !sk.isSA);
  }

  get TECH(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.stat && sk.stat.toLowerCase() === 'tech' && !sk.isSA);
  }

  get Other(): Array<Cp2020PlayerSkill> {
    return this.skills.filter((sk) => sk.name.toLowerCase() === 'other' && !sk.isSA);
  }

  get RoleSKills(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => sk.isRoleSkill && !sk.chipped);
  }

  get RoleSKillTotal(): number {
    return this.RoleSKills.reduce((a, b) => a + b.value, 0);
  }

  get ChippedSkills(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => sk.chipped);
  }

  get NonRoleSkills(): Array<Cp2020PlayerSkill> {
    return this.skills.filter(sk => !sk.chipped && !sk.isRoleSkill);
  }

  get NonRoleSKillTotal(): number {
    return this.NonRoleSkills.reduce((a, b) => a + b.value, 0);
  }

  getSkillForWeaponType(type: string): Array<Cp2020PlayerSkill> {
    if (!type) {
      return [];
    }
    let list = new Array<Cp2020PlayerSkill>();
    switch (type.toLowerCase()) {
      case 'p':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('handgun') || s?.option?.toLowerCase() === 'handgun');
        break;
      case 'smg':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('submachinegun') || s?.option?.toLowerCase() === 'sub machinegun');
        break;
      case 'rif':
      case 'sht':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('rifle') || s?.option?.toLowerCase() === 'rifle');
        break;
      case 'mel':
        list = this.getPhysicalCombatSkills();
        list.unshift(
          new Cp2020PlayerSkill({ name: 'Not trained', stat: 'ref', value: 0 })
        );
        break;
      case 'hvy':
        list = this.REF.filter((s) => s.name.toLowerCase().startsWith('heavy weapons') || s?.option?.toLowerCase() === 'heavy weapons');
        break;
      default:
        list = this.getCombatSkills();
    }
    if (list.length < 1) {
      return [new Cp2020PlayerSkill({ name: 'Not trained', stat: 'ref', value: 0 })];
    }
    return list;
  }

  getPhysicalCombatSkills(): Array<Cp2020PlayerSkill> {
    return this.REF.filter(
      (s) =>
        s.name.toLowerCase() === 'melee' ||
        s.name.toLowerCase().startsWith('brawling') ||
        s.name.toLowerCase().startsWith('martial') ||
        s.name.toLowerCase() === 'fencing'
    );

  }

  getCombatSkills(): Array<Cp2020PlayerSkill> {
    return this.REF.filter(
      (s) =>
        s.name.toLowerCase() === 'melee' ||
        s.name.toLowerCase().startsWith('brawling') ||
        s.name.toLowerCase().startsWith('martial') ||
        s.name.toLowerCase() === 'fencing' ||
        s.name.toLowerCase() === 'rifle' ||
        s.name.toLowerCase() === 'pistol' ||
        s.name.toLowerCase() === 'handgun' ||
        s.name.toLowerCase() === 'submachinegun' ||
        s.name.toLowerCase() === 'archery' ||
        s.name.toLowerCase() === 'heavy weapons' ||
        s.name.toLowerCase() === 'initiative' ||
        s?.option?.toLowerCase() === 'archery' ||
        s?.option?.toLowerCase() === 'rifle' ||
        s?.option?.toLowerCase() === 'handgun' ||
        s?.option?.toLowerCase() === 'sub machinegun' ||
        s?.option?.toLowerCase() === 'archery' ||
        s?.option?.toLowerCase() === 'heavy weapons'
    );
  }

  setRoleSkills(roleSkills: any[]) {
    this.skills = this.skills.map(sk => {
      sk.isRoleSkill = false;
      sk.roleChoice = false;
      return sk;
    });
    // set the isRoleSkill flag
    let skills = this.processRoleSkillArray(this.COOL, roleSkills);
    skills = this.processRoleSkillArray(this.EMP, skills);
    skills = this.processRoleSkillArray(this.TECH, skills);
    skills = this.processRoleSkillArray(this.BODY, skills);
    skills = this.processRoleSkillArray(this.ATTR, skills);
    skills = this.processRoleSkillArray(this.INT, skills);
    skills = this.processRoleSkillArray(this.REF, skills);
    this.addToOthers(skills);
  }

  setSecondarySkills(secondarySkills: any[]) {
    // set the isRoleSkill flag
    let skills = this.processRoleSkillArray(this.COOL, secondarySkills, true);
    skills = this.processRoleSkillArray(this.EMP, skills, true);
    skills = this.processRoleSkillArray(this.TECH, skills, true);
    skills = this.processRoleSkillArray(this.BODY, skills, true);
    skills = this.processRoleSkillArray(this.ATTR, skills, true);
    skills = this.processRoleSkillArray(this.INT, skills, true);
    skills = this.processRoleSkillArray(this.REF, skills, true);
    this.addToOthers(skills);

  }

  private processRoleSkillArray(skillArray: Array<Cp2020PlayerSkill>, roleSkills: any[], isSecondary?: boolean) {
    if (!Array.isArray(roleSkills)) {
      return;
    }
    // find if a role skill
    let rSkills = roleSkills.slice();
    let index = rSkills.length - 1;
    while (index >= 0) {
      const roleSkill = rSkills[index];
      if (Array.isArray(roleSkill)) {
        let j = rSkills[index].length - 1;
        while (j >= 0) {
          rSkills[index] = this.setRoleSkill(roleSkill[j], skillArray, rSkills[index], j, isSecondary, true);
          j--;
        }
      } else {
        rSkills = this.setRoleSkill(roleSkill.toLowerCase(), skillArray, rSkills, index, isSecondary, false);
      }
      index--;
    }
    return rSkills;
  }

  private setRoleSkill(skillToFind: string, skillArray: Array<Cp2020PlayerSkill>, roleSkills: any[], index: number, isSecondary: boolean, isChoice: boolean) {
    let found = -1;
    // determine if this skill has options
    if (skillToFind.includes(':')) {
      const parsed = skillToFind.split(':');
      const name = parsed[0].trim();
      const option = parsed[1].trim();
      found = skillArray.findIndex(s => s.name.toLowerCase() === name && s.option && s.option.toLowerCase() === option);
    } else {
      found = skillArray.findIndex(s => s.name?.toLowerCase() === skillToFind.toLowerCase());
    }

    if (found > -1) {
      skillArray[found].isRoleSkill = true;
      skillArray[found].isSecondarySkill = isSecondary;
      skillArray[found].roleChoice = isChoice;
      roleSkills.splice(index, 1);
    }
    return roleSkills;
  }

  addToOthers(roleSkills: any[]) {
    // reset all the skills.
    this.Other.map(skill => { skill.isRoleSkill = false; skill.roleChoice = false; });
    let index = roleSkills ? roleSkills.length - 1 : -1;
    // loop through the role array of skills.
    while (index >= 0) {
      // check if the role skill is an array of choices
      if (Array.isArray(roleSkills[index])) {
        // loop through choices
        roleSkills[index].forEach((sk, j) => {
          if (sk.indexOf('Expert') > -1) {
            this.addExpert(sk);
          } else {
            const found = this.Other.findIndex(skill => skill.option?.toLowerCase() === sk?.toLowerCase());
            if (found < 0) {
              const newSkill = new Cp2020PlayerSkill(sk);
              newSkill.name = 'Other';
              newSkill.option = sk;
              newSkill.isRoleSkill = true;
              newSkill.roleChoice = true;
              this.skills.push(newSkill);
            }
          }
        });
      } else {
        if (roleSkills[index]?.indexOf('Expert') > -1) {
          this.addExpert(roleSkills[index]);
        } else {
          const found = this.Other.findIndex(sk => sk.option?.toLowerCase() === roleSkills[index]?.toLowerCase());
          if (found < 0) {
            const i = this.Other.findIndex(sk => sk.option === '');
            if (i > -1) {
              this.Other[i].option = roleSkills[index];
              this.Other[i].isRoleSkill = true;
            }
          }
        }
      }
      index--;
    }
  }

  addSkill(skill: Cp2020PlayerSkill) {
    this.skills.push(skill);
  }

  addSpecialAbility(skill: Cp2020PlayerSkill) {
    if (skill && skill.name !== '') {
      skill.isSA = true;
      const found = this.skills.findIndex(sk => sk.name.toLowerCase() === skill.name.toLowerCase());
      if (found < 0) {
        skill.isRoleSkill = true;
        this.skills.push(new Cp2020PlayerSkill(skill));
      } else {
        this.skills[found].isSA = true;
        this.skills[found].isRoleSkill = true;
      }
    }
  }

  deleteSkill(skill: Cp2020PlayerSkill) {
    const index = this.skills.findIndex(sk => {
      if (skill.option) {
        return sk.name.toLocaleLowerCase() === skill.name.toLocaleLowerCase() && sk.option.toLocaleLowerCase() === skill.option.toLocaleLowerCase();
      }
      return sk.name.toLocaleLowerCase() === skill.name.toLocaleLowerCase();
    });
    if (index > -1) {
      this.skills.splice(index, 1);
    }
  }

  editSkill(skill: Cp2020PlayerSkill) {
    const skills = [...this.skills];
    const i = skills.findIndex(sk => sk.name.toLowerCase() === skill.name.toLowerCase() && sk.option === skill.option);
    if (i > -1) {
      skills[i] = new Cp2020PlayerSkill(skill);
    }
    this.skills = [...skills];
  }

  addExpert(skillName: string) {
    const index = this.INT.findIndex(sk => sk.name.toLowerCase() === 'expert');
    this.INT[index].option = skillName.replace('Expert: ', '');
    this.INT[index].isRoleSkill = true;
  }

  calculateTotals() {
    this.RoleTotal = this.RoleSKillTotal;
    this.OtherTotal = this.NonRoleSKillTotal;
  }
}
