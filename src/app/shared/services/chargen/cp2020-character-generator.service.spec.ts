import { LifePathResults } from './../../models/lifepath/lifepath-results';
import {
  Cp2020PlayerCharacter,
  Cp2020PlayerRole,
  Cp2020PlayerGearList
} from './../../models/cp2020character';
import {Cp2020PlayerSkills} from './../../cp2020/cp2020-skills/models';
import { TestBed } from '@angular/core/testing';

import { Cp2020CharacterGeneratorService } from './cp2020-character-generator.service';
import { Cp2020StatBlock } from '../../cp2020/cp2020-stats/models';
import { Cp2020ArmorBlock } from '../../cp2020/cp2020-armor/models';
import { Cp2020PlayerCyberList } from '../../cp2020/cp2020-cyberware/models';
import { CpPlayerWeaponList } from '../../cp2020/cp2020weapons/models';

describe('Cp2020CharacterGeneratorService', () => {

  let service: Cp2020CharacterGeneratorService;

  let newCharacter = new Cp2020PlayerCharacter();

  beforeEach(() => {
    newCharacter = new Cp2020PlayerCharacter();
    newCharacter.handle = 'Test Character';

    newCharacter.role = new Cp2020PlayerRole();
    newCharacter.role.name = 'Fixer';
    newCharacter.role.specialAbility.name = 'Streetdeal';
    newCharacter.role.skills = new Array();

    newCharacter.stats = new Cp2020StatBlock();
    newCharacter.stats.INT.Base = 8;
    newCharacter.stats.REF.Base = 8;
    newCharacter.stats.EMP.Base = 8;
    newCharacter.stats.BODY.Base = 8;
    newCharacter.stats.LUCK.Base = 8;
    newCharacter.stats.COOL.Base = 8;
    newCharacter.stats.TECH.Base = 8;
    newCharacter.stats.ATTR.Base = 8;
    newCharacter.stats.MA.Base = 8;

    newCharacter.armor = new Cp2020ArmorBlock();
    newCharacter.cyberware = new Cp2020PlayerCyberList(4);
    newCharacter.gear = new Cp2020PlayerGearList(10);
    newCharacter.weapons = new CpPlayerWeaponList(5);
    newCharacter.lifepath = new LifePathResults();
    newCharacter.skills = new Cp2020PlayerSkills();
    newCharacter.notes = 'Testing the code.';
    newCharacter.image = 'test-image';
    service = new Cp2020CharacterGeneratorService();
    TestBed.configureTestingModule({ });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear character', (done: DoneFn) => {
    service.clearCharacter();
    service.character.subscribe( character => {
      expect(character).toBeTruthy();
      expect(character.handle).toEqual('');
      done();
    });
  });

  it('should add character', (done: DoneFn) => {
    service.changeCharacter(newCharacter);
    service.character.subscribe(character => {
        expect(character.handle).toEqual('Test Character');
        done();
      });
  });
});
