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

  loadSkills(): void {
    this.skillDataService.skillListAsCharacterSkills
      .pipe(first())
      .subscribe((list) => {
        this._skills.next(list);
      });
  }
}
