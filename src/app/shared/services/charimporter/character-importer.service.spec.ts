import { Cp2020PlayerSkill } from './../../models/cp2020character/cp2020-player-skill';
import { CmbtTrckOpponent } from './../../models/cmbt-trck/cmbt-trck-opponent';
import { Cp2020PlayerCharacter } from './../../models/cp2020character/cp2020-player-character';
import { TestBed, inject } from '@angular/core/testing';

import { CharacterImporterService } from './character-importer.service';
import { CpPlayerWeapon } from './../../cp2020/cp2020weapons/models';
import { Cp2020PlayerCyber } from './../../cp2020/cp2020-cyberware/models';

describe('CharacterImporterService', () => {
  let testCp2020PC: Cp2020PlayerCharacter;
  let testCmbtTrkOpp: CmbtTrckOpponent;
  let service: CharacterImporterService;

  beforeEach(() => TestBed.configureTestingModule({}));



  beforeEach( inject([CharacterImporterService], (svc: CharacterImporterService) => {
    service = svc;
    testCp2020PC = new Cp2020PlayerCharacter();
    testCp2020PC.handle = 'Test PC';
    testCp2020PC.role.name = 'solo';
    for ( let i = 0; i < 4; i++) {
      testCp2020PC.gear.items[i] = {gear: `testgear${i}`, cost: 100, weight: 0};
      testCp2020PC.cyberware.items[i] = new Cp2020PlayerCyber({name: `testcyber${i}`});
      testCp2020PC.weapons.addWeapon(new CpPlayerWeapon({name: `testgun${i}`}));
    }
    testCmbtTrkOpp = new CmbtTrckOpponent();
    testCmbtTrkOpp.name = 'Test Opponent';
    testCmbtTrkOpp.role = 'Solo';
    testCmbtTrkOpp.sa = new Cp2020PlayerSkill();
    testCmbtTrkOpp.sa.name = 'Combat Sense';

  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should import cp2020 character', (done) => {
    const converted = service.convertCP2020PCToCmbtTrckOpp(testCp2020PC);
    expect(converted.name).toEqual(testCp2020PC.handle);
    expect(converted.role).toEqual(testCp2020PC.role.name);
    expect(converted.weapons.length).toEqual(4);
    expect(converted.cyberware.length).toEqual(4);
    expect(converted.gear.length).toEqual(4);
    done();
  });

  it('should import cmbttrck opponent', (done) => {
    const converted = service.convertCmbtTrckOppToCP2020PC(testCmbtTrkOpp);
    expect(converted).toBeTruthy();
    expect(converted.handle).toEqual(testCmbtTrkOpp.name);
    expect(converted.role.name).toEqual(testCmbtTrkOpp.role);
    expect(converted.role.specialAbility.name).toEqual(testCmbtTrkOpp.sa.name);
    done();
  });
});
