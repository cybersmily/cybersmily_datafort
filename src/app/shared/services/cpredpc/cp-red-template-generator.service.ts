import { RedJumpkitLifepathService } from './../lifepath/red-jumpkit-lifepath.service';
import { Observable, of } from 'rxjs';
import { CpRedBaseCharacter } from './../../models/character/cp-red-base-character';
import { DiceService } from './../dice/dice.service';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';
import { CpRedTemplate } from '../../models/character/cp-red-template';

@Injectable({
  providedIn: 'root'
})
export class CpRedTemplateGeneratorService {
  templates: CpRedTemplate[];

  constructor(private dataSerive: DataService,
              private dice: DiceService) {
    this.dataSerive.GetJson('/json/apps/chargen/cpredtemplates.json').subscribe( data => {
      this.templates = data.roles;
    });
  }

  generateCharacter(role: string): Observable<CpRedBaseCharacter> {
    const character = new CpRedBaseCharacter();
    character.role = role;
    // get the role from the templates
    const template = this.templates.find( temp => temp.name === role);
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
    return  of(character);
  }
}
