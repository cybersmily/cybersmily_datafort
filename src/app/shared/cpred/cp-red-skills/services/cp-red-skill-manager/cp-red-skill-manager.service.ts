import { CpRedSkillMod } from './../../models/cp-red-skill-mod';
import { CpRedSkill } from './../../models/cp-red-skill';
import { CpRedSkillDataService } from './../cp-red-skill-data/cp-red-skill-data.service';
import { BehaviorSubject, Observable, first, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CpRedCharacterSkill } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CpRedSkillManagerService {
  private _skills: BehaviorSubject<Array<CpRedCharacterSkill>> =
    new BehaviorSubject<Array<CpRedCharacterSkill>>(
      new Array<CpRedCharacterSkill>()
    );
  skills: Observable<Array<CpRedCharacterSkill>> = this._skills.asObservable();

  constructor(private skillDataService: CpRedSkillDataService) {}

  initialize(skills?: Array<CpRedSkill>): void {
    if (skills && skills.length > 0) {
      this.updateSkills(skills as Array<CpRedCharacterSkill>);
    } else {
      this.loadSkills();
    }
  }

  getSkill(skillName: string): CpRedCharacterSkill {
    return this._skills
      .getValue()
      .find((skill) => skill.name.toLowerCase() === skillName.toLowerCase());
  }

  updateSkills(skills: Array<CpRedCharacterSkill>): void {
    const newSkills = [
      ...skills
        .map((sk) => new CpRedCharacterSkill(sk))
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        ),
    ];
    this._skills.next(newSkills);
  }

  loadSkills(): void {
    this.skillDataService.skillListAsCharacterSkills
      .pipe(first())
      .subscribe((list) => {
        this._skills.next(list);
      });
  }

  addSkill(skill: CpRedCharacterSkill): void {
    const skills = this._skills.getValue();
    let index = skills.findIndex(
      (sk) => sk.name.toLowerCase() === skill.name.toLowerCase()
    );
    let count = 1;
    if (index < 0) {
      skills.push(skill);
      this.updateSkills(skills);
    } else {
      // if the skill name already exists, append a number
      while (index > -1) {
        skill.name += count + '';
        count++;
        index = skills.findIndex(
          (sk) => sk.name.toLowerCase() === skill.name.toLowerCase()
        );
      }
    }
  }

  updateSkill(oldSkillName: string, newSkill: CpRedCharacterSkill): void {
    const skills = this._skills.getValue();
    const index = skills.findIndex(
      (sk) => sk.name.toLowerCase() === oldSkillName.toLowerCase()
    );
    if (index > -1) {
      skills[index] = new CpRedCharacterSkill(newSkill);
      this.updateSkills(skills);
    }
  }

  deleteSkill(skillName: CpRedCharacterSkill): void {
    const skills = this._skills.getValue();
    const index = skills.findIndex(
      (sk) =>
        sk.name.toLowerCase() === skillName.name.toLowerCase() &&
        sk.type.toLowerCase() === skillName.type.toLowerCase() &&
        sk.stat.toLowerCase() === skillName.stat.toLowerCase()
    );
    if (index > -1) {
      skills.splice(index, 1);
      this.updateSkills(skills);
    }
  }

  addSkillModifier(skillName: string, modifier: CpRedSkillMod): void {
    const skill = this.getSkill(skillName);
    if (skill?.modifiers == null) {
      skill.modifiers = new Array<CpRedSkillMod>();
    }
    if (
      !skill?.modifiers.some((mod: CpRedSkillMod) =>
        mod.name.toLowerCase().localeCompare(modifier.name.toLowerCase())
      )
    ) {
      skill?.modifiers.push(modifier);
      this.updateSkill(skill.name, skill);
    }
  }

  deleteSkillModifier(skillName: string, modifier: CpRedSkillMod): void {
    const skill = this.getSkill(skillName);
    const index = skill.modifiers.findIndex(
      (mod: CpRedSkillMod) =>
        mod.name.toLowerCase() === modifier.name.toLowerCase()
    );
    if (index > -1) {
      skill.modifiers.splice(index, 1);
      this.updateSkill(skill.name, skill);
    }
  }

  hasSkillModifier(skillName: string, modName: string): Observable<boolean> {
    if (!skillName || !modName) {
      return of(false);
    }
    const skill = this.getSkill(skillName);
    return of(
      skill?.modifiers.some(
        (mod: CpRedSkillMod) =>
          mod.name?.toLowerCase() === modName?.toLowerCase()
      )
    );
  }

  toggleSkillModifierActive(skillName: string, index: number): void {
    const skill = this.getSkill(skillName);
    skill.modifiers[index].active = !skill.modifiers[index]?.active;
    this.updateSkill(skill.name, skill);
  }

  clear(): void {
    this._skills.next(new Array<CpRedCharacterSkill>());
  }
}
