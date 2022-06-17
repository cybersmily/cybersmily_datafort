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
  private _skillList: Array<CpRedSkillData>;

  constructor(private dataService: DataService) {}

  get skillTypes(): Observable<Array<string>> {
    if (this._skillTypes) {
      return of(this._skillTypes);
    }
    return this.dataService
      .GetJson<CpRedSkillDataFile>(JsonDataFiles.CPRED_SKILL_DATA_JSON)
      .pipe(
        map((data) => {
          this._skillList = data.skills;
          this._skillTypes = data.skillTypes;
          return this._skillTypes;
        })
      );
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
          this._skillTypes = data.skillTypes;
          return this._skillList;
        })
      );
  }

  get skillListAsCharacterSkills(): Observable<Array<CpRedCharacterSkill>> {
    return this.skillList.pipe(
      map((skills) =>
        skills?.map((skill) => {
          const sk = new CpRedCharacterSkill();
          sk.name = skill?.name;
          sk.type = skill?.type;
          sk.description = skill?.description;
          sk.source = skill?.source;
          sk.stat = skill?.stat;
          sk.required = skill?.required;
          sk.base = 0;
          sk.modified = 0;
          if (skill?.ipMod) {
            sk['ipMod'] = skill.ipMod;
          }
          return sk;
        })
      )
    );
  }
}
