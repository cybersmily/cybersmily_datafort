import { JsonDataFiles, DataService } from './../../../services/file-services';
import { Cp2020PlayerSkill, DataSkill } from './../models';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillListService {
  private _skillList: Array<DataSkill> = null;

  constructor(private dataService: DataService) {}

  get Skills(): Observable<Array<DataSkill>> {
    if (this._skillList) {
      return of(this._skillList);
    }
    return this.dataService
      .GetJson<Array<DataSkill>>(JsonDataFiles.CP2020_SKILLS_DATA_LIST_JSON)
      .pipe(
        map((data) => {
          data.forEach((sk) => {
            sk.name = sk.name.replace('\\', '');
          });
          this._skillList = data;
          return this._skillList;
        })
      );
  }

  get SpecialAbilities(): Observable<Array<DataSkill>> {
    return this.Skills.pipe(
      map((sk) => {
        return sk.filter((s) => s.sa);
      })
    );
  }

  findSkill(name: string): DataSkill {
    if (this._skillList) {
      return this._skillList.find(
        (sk) => sk.name.toLowerCase() === name.toLowerCase()
      );
    }
    return null;
  }

  findDataSkillList(list: Array<string>): Array<DataSkill> {
    const results = new Array<DataSkill>();
    if (this._skillList) {
      list.forEach((sk) => {
        if (typeof sk === 'string') {
          const skill = this.findSkill(sk);
          if (skill) {
            results.push(skill);
          }
        }
        if (Array.isArray(sk)) {
          sk.forEach((s) => {
            const skill = this.findSkill(s);
            if (skill) {
              results.push(skill);
            }
          });
        }
      });
    }
    return results;
  }

  getCP2020SkillList(list: Array<string>): Array<Cp2020PlayerSkill> {
    const results = new Array<Cp2020PlayerSkill>();
    if (this._skillList) {
      list.forEach((sk) => {
        if (typeof sk === 'string') {
          const skill = this.findSkill(sk);
          if (skill) {
            const cpSkill = new Cp2020PlayerSkill();
            cpSkill.name = skill.name;
            cpSkill.ipMod = skill.ipmod;
            cpSkill.stat = skill.stat;
            results.push(cpSkill);
          }
        }
        if (Array.isArray(sk)) {
          sk.forEach((s) => {
            const skill = this.findSkill(s);
            if (skill) {
              results.push(new Cp2020PlayerSkill(skill));
            }
          });
        }
      });
    }
    return results;
  }
}
