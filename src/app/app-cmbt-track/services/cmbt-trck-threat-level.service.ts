import { Cp2020RandomWeaponSettingsService } from './../../shared/cp2020/cp2020weapons/services/cp2020-random-weapon-settings/cp2020-random-weapon-settings.service';
import { RandomWeaponFilters, RandomWeaponSettings } from './../../shared/cp2020/cp2020weapons/models/random-weapon-filters';
import { map, take } from 'rxjs/operators';
import { RandomWeaponGeneratorService } from './../../shared/cp2020/cp2020weapons/services/random-weapon-generator/random-weapon-generator.service';
import { Observable, of } from 'rxjs';
import { DiceService } from './../../shared/services/dice/dice.service';
import { OppThreatCode } from './../../shared/models/cmbt-trck/opp-threat-code';
import { CmbtTrckOpponent } from './../../shared/models/cmbt-trck/cmbt-trck-opponent';
import { Injectable } from '@angular/core';
import { Cp2020ArmorPiece } from './../../shared/cp2020/cp2020-armor/models';
import { Cp2020PlayerSkill } from './../../shared/cp2020/cp2020-skills/models';

@Injectable({
  providedIn: 'root',
})
export class CmbtTrckThreatLevelService {
  constructor(
    private dice: DiceService,
    private wpnGeneratorService: RandomWeaponGeneratorService,
    private wpnRandomSettings: Cp2020RandomWeaponSettingsService
  ) {}

  generate(threatCode: OppThreatCode): Observable<CmbtTrckOpponent> {
    let opp = new CmbtTrckOpponent();
    // sent stats. All Threat levels have a REF of 8
    opp = this.setStats(opp);
    // set combat skills based on Threat Level skill selected
    opp = this.setSkills(opp, threatCode.skill);
    // set armor based on threate level amor selected
    opp = this.setArmor(opp, threatCode.armor);
    // set weapons based on threat level weapon selected
    return this.setWeapons(opp, threatCode.weapon);
  }

  private setStats(opp: CmbtTrckOpponent): CmbtTrckOpponent {
    opp.stats.REF.Base = 8;
    opp.stats.BODY.Base = 7;
    opp.stats.MA.Base = 7;
    opp.stats.LUCK.Base = 5;
    opp.stats.INT.Base = 5;
    opp.stats.COOL.Base = 7;
    opp.stats.TECH.Base = 5;
    opp.stats.ATTR.Base = 5;
    opp.stats.EMP.Base = 5;
    return opp;
  }

  private setSkills(
    opp: CmbtTrckOpponent,
    threatCodeSkill: string
  ): CmbtTrckOpponent {
    let skillLevel = 2;
    switch (threatCodeSkill) {
      case 'A':
        skillLevel = 10;
        break;
      case 'B':
        skillLevel = 8;
        break;
      case 'C':
        skillLevel = 6;
        break;
      case 'D':
        skillLevel = 4;
        break;
    }
    opp.addSkill(
      new Cp2020PlayerSkill({ name: 'Melee', stat: 'REF', value: skillLevel })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({ name: 'Fencing', stat: 'REF', value: skillLevel })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({ name: 'Handgun', stat: 'REF', value: skillLevel })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({ name: 'SMG', stat: 'REF', value: skillLevel })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({ name: 'Rifle', stat: 'REF', value: skillLevel })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({
        name: 'Hvy. Wpn',
        stat: 'REF',
        value: skillLevel,
      })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({
        name: 'Brawling',
        stat: 'REF',
        value: skillLevel,
      })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({
        name: 'Martial Art',
        stat: 'REF',
        value: skillLevel,
      })
    );
    opp.addSkill(
      new Cp2020PlayerSkill({ name: 'Archery', stat: 'REF', value: skillLevel })
    );
    return opp;
  }

  private setArmor(
    opp: CmbtTrckOpponent,
    threatCodeArmor: string
  ): CmbtTrckOpponent {
    let roll = 0;
    switch (threatCodeArmor) {
      case 'A':
        opp.armor.addPiece(
          new Cp2020ArmorPiece({
            name: 'power-assisted armor',
            baseSP: 30,
            ev: 2,
            locations: { head: 30, torso: 30, arms: 30, legs: 30 },
          })
        );
        break;
      case 'B':
        roll = this.dice.generateNumber(1, 4);
        switch (roll) {
          case 1:
            opp.armor.addPiece(
              new Cp2020ArmorPiece({
                name: 'door gunner vet',
                baseSP: 25,
                ev: 3,
                locations: { torso: 25 },
              })
            );
            break;
          default:
            opp.armor.addPiece(
              new Cp2020ArmorPiece({
                name: 'Metal Gear',
                baseSP: 25,
                ev: 2,
                locations: { head: 25, torso: 25, arms: 25, legs: 25 },
              })
            );
        }
        break;
      case 'C':
        roll = this.dice.generateNumber(1, 3);
        switch (roll) {
          case 1:
            opp.armor.addPiece(
              new Cp2020ArmorPiece({
                name: 'heavy armor jacket',
                baseSP: 20,
                ev: 2,
                locations: { torso: 20, arms: 20 },
              })
            );
            break;
          case 2:
            opp.armor.addPiece(
              new Cp2020ArmorPiece({
                name: 'me armor jacket',
                baseSP: 18,
                ev: 1,
                locations: { torso: 18, arms: 18 },
              })
            );
            break;
          default:
            opp.armor.addPiece(
              new Cp2020ArmorPiece({
                name: 'light armor jacket',
                baseSP: 14,
                locations: { torso: 14, arms: 14 },
              })
            );
        }
        opp.armor.addPiece(
          new Cp2020ArmorPiece({
            name: 'armor pants',
            baseSP: 12,
            locations: { legs: 6 },
          })
        );
        break;
      case 'D':
        opp.armor.addPiece(
          new Cp2020ArmorPiece({
            name: 'kevlar vest',
            baseSP: 10,
            locations: { torso: 10 },
          })
        );
        opp.armor.addPiece(
          new Cp2020ArmorPiece({
            name: 'leather pants',
            baseSP: 4,
            locations: { legs: 6 },
          })
        );
        break;
    }
    return opp;
  }

  private setWeapons(
    opp: CmbtTrckOpponent,
    threatCodeWeapon: number
  ): Observable<CmbtTrckOpponent> {
    const filter: RandomWeaponFilters = {};
    switch (threatCodeWeapon) {
      case 1:
        filter.category = ['EXOTICS', 'RIFLES'];
        filter.subcategory = ['', 'BOWS', 'CROSSBOWS', 'ASSAULT'];
        filter.availability = ['E', 'C', 'P'];
        // assault/exotic
        break;
      case 2:
        // automatic wapons, smgs
        filter.category = ['SMG', 'SHOTGUNS'];
        filter.subcategory = ['HEAVY', 'LIGHT', 'MEDIUM', 'AUTO'];
        filter.availability = ['E', 'C', 'P'];
        break;
      case 3:
        // large hanguns, shotguns
        filter.category = ['PISTOLS', 'SHOTGUNS', 'RIFLES'];
        filter.subcategory = ['HEAVY', 'LIGHT', 'OTHER', ''];
        filter.availability = ['E', 'C'];
        break;
      case 4:
        // melee and small hanguns
        filter.category = ['PISTOLS', 'MELEE'];
        filter.subcategory = ['MEDIUM', 'LIGHT', ''];
        filter.availability = ['E', 'C'];
        break;
      default:
        return of(opp);
    }
    this.wpnRandomSettings.setSettings({count: 1, filters: filter});
    return this.wpnGeneratorService.generate().pipe(
      take(1),
      map((wpn) => {
        opp.weapons.push(wpn);
        return opp;
      })
    );
  }
}
