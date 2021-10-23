import { map } from 'rxjs/operators';
import { JsonDataFiles, DataService } from './../../../services/file-services';
import { Observable, of } from 'rxjs';
import { CpRedBaseCharacter } from '../../models/cp-red-base-character';
import { DiceService } from '../../../services/dice/dice.service';
import { Injectable } from '@angular/core';
import { CpRedTemplate } from '../../models/cp-red-template';

@Injectable({
  providedIn: 'root'
})
export class CpRedTemplateGeneratorService {
  private _templates: CpRedTemplate[];

  constructor(private dataSerive: DataService,
              private dice: DiceService) {
  }


  generateCharacter(role: string): Observable<CpRedBaseCharacter> {
    if (this._templates) {
      return of(this.setCharacter(role));
    }
    return this.dataSerive.GetJson(JsonDataFiles.CPRED_CHARACTER_TEMPLATE_JSON)
    .pipe( map(data => {
      this._templates = data.roles;
      return  this.setCharacter(role);
    }));
  }

  private setCharacter(role: string): CpRedBaseCharacter {
    const character = new CpRedBaseCharacter();
    character.role = role;
    // get the role from the templates
    const template = this._templates.find( temp => temp.name.toLowerCase() === role.toLowerCase());
    // transfer data to character object
    character.armor = template.armor;
    character.skills = template.skills;
    character.gear = template.gear;
    character.cyberware = template.cyberware;
    character.weapons = template.weapons;

    // roll for the stat block to use
    const roll = this.dice.generateNumber(0, 5);
    const stats = template.stats[roll];
    character.stats.INT.set(stats.int);
    character.stats.REF.set(stats.ref);
    character.stats.DEX.set(stats.dex);
    character.stats.WILL.set(stats.will);
    character.stats.COOL.set(stats.cool);
    character.stats.EMP.set(stats.emp);
    character.stats.TECH.set(stats.tech);
    character.stats.LUCK.set(stats.luck);
    character.stats.MOVE.set(stats.move);
    character.stats.BODY.set(stats.body);
    return character;
  }
}
