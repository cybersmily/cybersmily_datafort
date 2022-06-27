import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CpRedSkillDataFile,
  CpRedCharacterSkill,
  CpRedSkillData,
} from './../../models';
import {
  DataService,
  JsonDataFiles,
} from './../../../../services/file-services';

@Injectable({
  providedIn: 'root',
})
export class CpRedSkillDataService {
  private _skillTypes: Array<string>;
  private _skillStats: Array<string>;
  private _skillList: Array<CpRedSkillData>;

  constructor(private dataService: DataService) {}

  get skillTypes(): Observable<Array<string>> {
    return this.skillList.pipe(map((data) => this._skillTypes));
  }

  get skillStats(): Observable<Array<string>> {
    return this.skillList.pipe(map((data) => this._skillStats));
  }

  get skillList(): Observable<Array<CpRedSkillData>> {
    if (this._skillList) {
      return of(this._skillList);
    }
    return this.dataService
      .GetJson<CpRedSkillDataFile>(JsonDataFiles.CPRED_SKILL_DATA_JSON)
      .pipe(
        map((data) => {
          this._skillList = data.skills;
          this._skillStats = data.skillStats;
          this._skillTypes = data.skillTypes;
          return this._skillList;
        })
      );
  }

  get skillListAsCharacterSkills(): Observable<Array<CpRedCharacterSkill>> {
    return this.skillList.pipe(
      map((skills) =>
        skills?.map((skill) => {
          return new CpRedCharacterSkill(skill);
        })
      )
    );
  }
}
