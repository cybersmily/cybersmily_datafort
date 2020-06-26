import { Cp2020PlayerCyber } from './../../models/cyberware/cp2020-player-cyber';
import { Cp2020PlayerSkills, Cp2020PlayerSkill } from './../../models/cp2020character';
import { LifePathResults } from './../../models/lifepath/lifepath-results';
import { Cp2020PlayerGearList } from './../../models/cp2020character/cp2020-player-gear-list';
import { Cp2020PlayerCyberList } from '../../models/cyberware/cp2020-player-cyber-list';
import { CpPlayerWeaponList, CpPlayerWeapon } from '../../models/weapon';
import { Cp2020ArmorBlock } from './../../models/cp2020character/cp2020-armor-block';
import { Cp2020StatBlock } from './../../models/cp2020character/cp2020-stat-block';
import { BehaviorSubject } from 'rxjs';
import { Cp2020PlayerRole} from './../../models/cp2020character/cp2020-player-role';
import { Cp2020PlayerCharacter } from '../../models/cp2020character';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020CharacterGeneratorService {
  private _character = new BehaviorSubject<Cp2020PlayerCharacter>(new Cp2020PlayerCharacter());
  private _storageKey = 'CybersmilyDFCharacter';
  character = this._character.asObservable();

  private _currCharacter: Cp2020PlayerCharacter;

  constructor() {
    if ( window.localStorage && window.localStorage.getItem(this._storageKey)) {
      const character = JSON.parse(window.localStorage.getItem(this._storageKey));
      this.changeCharacter(character);
    } else {
      this._currCharacter = new Cp2020PlayerCharacter();
    }
  }

  changeCharacter(value: any) {
    this._currCharacter = new Cp2020PlayerCharacter();
    this._currCharacter.handle = (value.handle) ? value.handle : '';
    if (value.role) {
      this._currCharacter.role.import(value.role);
    }
    if (value.stats) {
      this._currCharacter.stats.import(value.stats);
    }
    if (value.armor) {
      this._currCharacter.armor = new Cp2020ArmorBlock(value.armor);
      this._currCharacter.stats.REF.ev = this._currCharacter.armor.ev;
    }
    if (value.weapons) {
      this._currCharacter.weapons.items = new Array<CpPlayerWeapon>();
        value.weapons.items.forEach( w => {
          this._currCharacter.weapons.items.push(new CpPlayerWeapon(w));
        });
    }

    if (value.cyberware) {
      this._currCharacter.cyberware.items = new Array<Cp2020PlayerCyber>();
      value.cyberware.items.forEach( c => {
        this._currCharacter.cyberware.items.push(new Cp2020PlayerCyber(c));
      });
    }

    if (value.gear) {
      this._currCharacter.gear.items = value.gear.items;
    }

    if (value.lifepath) {
      this._currCharacter.lifepath.appearance = value.lifepath.appearance;
      this._currCharacter.lifepath.ethnicity = value.lifepath.ethnicity;
      this._currCharacter.lifepath.events = value.lifepath.events;
      this._currCharacter.lifepath.motivations = value.lifepath.motivations;
      this._currCharacter.lifepath.family.familyBackground = value.lifepath.family.familyBackground;
      this._currCharacter.lifepath.family.familyRanking = value.lifepath.family.familyRanking;
      this._currCharacter.lifepath.family.siblings.siblings = value.lifepath.family.siblings.siblings;
    }

    if (value.skills) {
      if (value.skills.skills) {
        this._currCharacter.skills.skills = value.skills.skills;
      } else {
        // backwards compatible
        let combo: Array<Cp2020PlayerSkill> = value.skills.ATTR;
        combo = combo.concat(value.skills.BODY);
        combo = combo.concat(value.skills.COOL);
        combo = combo.concat(value.skills.EMP);
        combo = combo.concat(value.skills.INT);
        combo = combo.concat(value.skills.REF);
        combo = combo.concat(value.skills.TECH);
        combo = combo.concat(value.skills.Other);
        this._currCharacter.skills.skills = combo;
      }
      this._currCharacter.skills.calculateTotals();
    }

    if (value.notes) {
      this._currCharacter.notes = value.notes;
    }

    this.updateCharacter();
  }

  changeHandle(value: string) {
    this._currCharacter.handle = value;
    this.updateCharacter();
  }

  changeRole(value: Cp2020PlayerRole) {
    this._currCharacter.role = value;
    // set the role skills
    this._currCharacter.skills.setRoleSkills(value.skills);
    if (value.secondary) {
      this._currCharacter.skills.setSecondarySkills(value.secondary);
    }
    console.log(this._currCharacter.skills);
    this._currCharacter.skills.calculateTotals();
    this.updateCharacter();
  }

  changeStats(value: Cp2020StatBlock) {
    this._currCharacter.stats = value;
    this.updateCharacter();
  }

  changeArmor(value: Cp2020ArmorBlock) {
    this._currCharacter.armor = value;
    this._currCharacter.stats.REF.ev = this._currCharacter.armor.ev;
    this.updateCharacter();
  }

  changeCyberware(value: Cp2020PlayerCyberList) {
    this._currCharacter.cyberware = value;
    this._currCharacter.stats.HumanityCost = value.totalHL;
    this.updateCharacter();
  }

  changeGear( value: Cp2020PlayerGearList) {
    this._currCharacter.gear = value;
    this.updateCharacter();
  }

  changeWeapons( value: CpPlayerWeaponList) {
    this._currCharacter.weapons = value;
    this.updateCharacter();
  }

  changeLifepath( value: LifePathResults) {
    this._currCharacter.lifepath = value;
    this.updateCharacter();
  }

  changeNotes(value: string) {
    this._currCharacter.notes = value;
    this.updateCharacter();
  }

  changeSkills(value: Cp2020PlayerSkills) {
    // TODO: update the role skills for the character
    // remove the options
    this._currCharacter.skills = value;
    this._currCharacter.skills.calculateTotals();
    this.updateCharacter();
  }

  /**
   * Get the character object from local storage.
   *
   * @returns {string}
   * @memberof Cp2020CharacterGeneratorService
   */
  getFromStorage(): string {
    return window.localStorage.getItem(this._storageKey);
  }


  /**
   * Save the current character object to local storage.
   *
   * @memberof Cp2020CharacterGeneratorService
   */
  saveToStorage() {
    window.localStorage.setItem(this._storageKey, JSON.stringify(this._currCharacter));
  }


  /**
   * Update character will save to localstorage and
   * update the obseverable.
   *
   * @memberof Cp2020CharacterGeneratorService
   */
  updateCharacter() {
    this.saveToStorage();
    this._character.next(this._currCharacter);
  }

  clearCharacter() {
    this._currCharacter = new Cp2020PlayerCharacter();
    window.localStorage.removeItem(this._storageKey);
    this._character.next(this._currCharacter);
  }
}
