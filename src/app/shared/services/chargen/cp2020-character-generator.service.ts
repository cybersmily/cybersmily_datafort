import { CacheKeys } from './../../cache-keys';
import { Cp2020PlayerSkills, Cp2020PlayerSkill } from './../../cp2020/cp2020-skills/models';
import { LifePathResults } from './../../models/lifepath/lifepath-results';
import { Cp2020PlayerGearList } from './../../models/cp2020character/cp2020-player-gear-list';
import { CpPlayerWeaponList, CpPlayerWeapon } from '../../cp2020/cp2020weapons/models';
import { Cp2020ArmorBlock } from './../../cp2020/cp2020-armor/models';
import { Cp2020StatBlock } from '../../cp2020/cp2020-stats/models/cp2020-stat-block';
import { BehaviorSubject } from 'rxjs';
import { Cp2020PlayerRole} from './../../models/cp2020character/cp2020-player-role';
import { Cp2020PlayerCharacter } from '../../models/cp2020character';
import { Injectable } from '@angular/core';
import { Cp2020PlayerCyber, Cp2020PlayerCyberList } from '../../cp2020/cp2020-cyberware/models';
import { Cp2020Lifestyle } from '../../cp2020/cp2020-lifestyle/models';

@Injectable({
  providedIn: 'root',
})
export class Cp2020CharacterGeneratorService {
  private _character = new BehaviorSubject<Cp2020PlayerCharacter>(
    new Cp2020PlayerCharacter()
  );
  character = this._character.asObservable();

  private _currCharacter: Cp2020PlayerCharacter;

  constructor() {
    if (
      window.localStorage &&
      window.localStorage.getItem(CacheKeys.CP2020_CHAR_GEN)
    ) {
      const character = JSON.parse(
        window.localStorage.getItem(CacheKeys.CP2020_CHAR_GEN)
      );
      this.changeCharacter(character);
    } else {
      this._currCharacter = new Cp2020PlayerCharacter();
    }
  }

  changeCharacter(value: any) {
    console.log('changeCharacter',value);
    this._currCharacter = new Cp2020PlayerCharacter();
    this._currCharacter.handle = value.handle ? value.handle : '';
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
    if (value.weapons && value.weapons.items) {
      this._currCharacter.weapons.items = new Array<CpPlayerWeapon>();
      value.weapons.items.forEach((w) => {
        this._currCharacter.weapons.items.push(new CpPlayerWeapon(w));
      });
    }

    if (value.lifeStyle) {
      this._currCharacter.lifeStyle = JSON.parse(JSON.stringify(value.lifeStyle));
    }

    if (value.cyberware) {
      this._currCharacter.cyberware.items = new Array<Cp2020PlayerCyber>();
      value.cyberware.items.forEach((c) => {
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
      this._currCharacter.lifepath.family.familyBackground =
        value.lifepath.family.familyBackground;
      this._currCharacter.lifepath.family.familyRanking =
        value.lifepath.family.familyRanking;
      this._currCharacter.lifepath.family.siblings.siblings =
        value.lifepath.family.siblings.siblings;
    }

    if (value.skills) {
      if (value.skills.skills) {
        this._currCharacter.skills.importSkills(value.skills.skills);
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
      this._currCharacter.skills.setRoleSkills(this._currCharacter.role.skills);
      this._currCharacter.skills.calculateTotals();
      this._currCharacter.skills.ip = value.skills.ip;
      this._currCharacter.skills.rep = value.skills.rep;
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

  changeGear(value: Cp2020PlayerGearList) {
    this._currCharacter.gear = value;
    this.updateCharacter();
  }

  changeWeapons(value: CpPlayerWeaponList) {
    this._currCharacter.weapons = value;
    this.updateCharacter();
  }

  changeLifepath(value: LifePathResults) {
    this._currCharacter.lifepath = value;
    this.updateCharacter();
  }

  changeLifeStyle(value: Cp2020Lifestyle) {
    this._currCharacter.lifeStyle = value;
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

  changeRep(value: number) {
    this._currCharacter.skills.rep = value;
    this.updateCharacter();
  }

  /**
   * Get the character object from local storage.
   *
   * @returns {string}
   * @memberof Cp2020CharacterGeneratorService
   */
  getFromStorage(): string {
    return window.localStorage.getItem(CacheKeys.CP2020_CHAR_GEN);
  }

  /**
   * Save the current character object to local storage.
   *
   * @memberof Cp2020CharacterGeneratorService
   */
  saveToStorage() {
    window.localStorage.setItem(
      CacheKeys.CP2020_CHAR_GEN,
      JSON.stringify(this._currCharacter)
    );
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
    console.log('updateCharacter',this._character.value);
  }

  clearCharacter() {
    this._currCharacter = new Cp2020PlayerCharacter();
    window.localStorage.removeItem(CacheKeys.CP2020_CHAR_GEN);
    this._character.next(this._currCharacter);
  }
}
