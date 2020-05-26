import { Cp2020PlayerCyber } from './../../models/cyberware';
import { CpPlayerWeapon } from './../../models/weapon';
import { CmbtTrckOpponent } from './../../models/cmbt-trck';
import { Cp2020PlayerCharacter } from './../../models/cp2020character';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterImporterService {

  constructor() { }

  convertCP2020PCToCmbtTrckOpp(character: Cp2020PlayerCharacter): CmbtTrckOpponent {
    const opp = new CmbtTrckOpponent();
    console.log(character);
    opp.name = character.handle;
    opp.role = character.role.name;
    opp.sa = character.role.specialAbility;
    opp.stats = character.stats;
    if (character.skills.skills) {
      opp.skills = character.skills.skills.filter(s => s.name && s.name !== '' && s.value > 0);
    } else {
      opp.skills = opp.skills.concat(character.skills.ATTR.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.BODY.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.COOL.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.EMP.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.INT.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.REF.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.TECH.filter(s => s.name && s.name !== '' && s.value > 0));
      opp.skills = opp.skills.concat(character.skills.Other.filter(s => s.name && s.name !== '' && s.value > 0));
    }
    opp.weapons = character.weapons.items
        .map(w => new CpPlayerWeapon(w))
        .filter(w => w.name && w.name !== '');
    opp.cyberware = character.cyberware.items
        .map(c => new Cp2020PlayerCyber(c))
        .filter(c => c.name && c.name !== '');
    opp.gear = character.gear.items.filter(g => g.gear && g.gear !== '').map( g => g.gear);
    opp.armor = character.armor;
    console.log(opp);
    return opp;
  }


  convertCmbtTrckOppToCP2020PC(opp: CmbtTrckOpponent): Cp2020PlayerCharacter {
    const char = new Cp2020PlayerCharacter();
    return char;
  }
}
