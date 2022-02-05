import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService, JsonDataFiles } from './../../services/file-services';
import { DataSkill } from '../cp2020-skills/models/data-skill';
import { Cp2020PlayerSkills} from './../cp2020-skills/models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020IuSkillConverterService {

  private IU_MAP = 'iu';
  private CP2020_MAP = 'cp2020';

  constructor(private dataService: DataService) { }


  /**
   * Converts characters CP2020PlayerSkills into IU's provided skill list.
   *
   * @param {Array<DataSkill>} skillList - IU Skill list. Load from file first.
   * @param {Cp2020PlayerSkills} characterSkils - Current characters skills.
   * @return {*}  {Cp2020PlayerSkills}
   * @memberof Cp2020IuSkillConverterService
   */
  convertCP2020SkillsToIU(skillList: Array<DataSkill>, characterSkils: Cp2020PlayerSkills): Observable<Cp2020PlayerSkills> {
    return this.convertSkills(skillList, characterSkils, false, this.CP2020_MAP, this.IU_MAP);
  }


  /**
   * Converts characters CP2020PlayerSkills (assuming these are IU skills) into Cp2020's provided skill list.
   *
   * @param {Array<DataSkill>} skillList - IU Skill list. Load from file first.
   * @param {Cp2020PlayerSkills} characterSkils - Current characters skills.
   * @return {*}  {Cp2020PlayerSkills}
   * @memberof Cp2020IuSkillConverterService
   */
  convertIUSkillsToCP2020(skillList: Array<DataSkill>, characterSkils: Cp2020PlayerSkills): Observable<Cp2020PlayerSkills> {
    return this.convertSkills(skillList, characterSkils, true, this.IU_MAP, this.CP2020_MAP);
  }

  private convertSkills(skillList: Array<DataSkill>, characterSkills: Cp2020PlayerSkills, hasOthers: boolean, source: string, target: string) {
    return this.dataService.GetJson(JsonDataFiles.IU_SKILLS_MAPPING_LIST_JSON)
    .pipe(
      map(
        data => {
          characterSkills = this.mapSkills(characterSkills, data, source, target);
          return this.createNewSkills(skillList, characterSkills, hasOthers);
    }));
  }

  private mapSkills(characterSkills: Cp2020PlayerSkills, mappings: Array<any>, source: string, target: string): Cp2020PlayerSkills {
    mappings.forEach( m => {
      const index = characterSkills.skills.findIndex(sk => {
        return sk.name.toLowerCase() === m[source].name.toLowerCase() && sk.option === m[source].option
      });
      if (index > -1) {
        characterSkills.skills[index].name = m[target].name;
        characterSkills.skills[index].option = m[target].option;
      }
    });
    return characterSkills;
  }



  private createNewSkills(skillList: Array<DataSkill>, characterSkills: Cp2020PlayerSkills, hasOthers: boolean): Cp2020PlayerSkills {
    const skills = new Cp2020PlayerSkills(skillList, true);
    const existing = characterSkills.SkillsWithValues.slice();
    skills.importSkills(existing)
    return skills;
  }
}
