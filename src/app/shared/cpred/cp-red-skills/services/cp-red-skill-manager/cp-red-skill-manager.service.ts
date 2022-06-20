import { CpRedSkill } from './../../models/cp-red-skill';
import { CpRedSkillDataService } from './../cp-red-skill-data/cp-red-skill-data.service';
import { BehaviorSubject, Observable, first } from 'rxjs';
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

  updateSkills(skills: Array<CpRedCharacterSkill>): void {
    const newSkills = skills.map((sk) => new CpRedCharacterSkill(sk));
    this._skills.next(newSkills);
  }

  loadSkills(): void {
    this.skillDataService.skillListAsCharacterSkills
      .pipe(first())
      .subscribe((list) => {
        this._skills.next(list);
      });
  }
}
