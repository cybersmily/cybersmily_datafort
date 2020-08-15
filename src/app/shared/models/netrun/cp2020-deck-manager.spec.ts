import { Cp2020ProgramList } from './cp2020-program-list';
import { Cp2020NetrunDeck } from './cp2020-netrun-deck';
import { NetRunProgram } from './net-run-program';
import { NrDeckManager } from './nr-deck-manager';
import { Cp2020DeckManager } from './cp2020-deck-manager';

describe('Cp2020DeckManager', () => {
  let manager: Cp2020DeckManager;
  let importManager: Cp2020DeckManager;


  beforeEach(() => {
    manager = new Cp2020DeckManager();
    importManager = new Cp2020DeckManager({
      deck: {
        name: 'test',
        type: { name: 'cellular', description: '', cost: 1000 },
        mu: 20,
        doubleMu: true,
        dataWall: 5,
        speed: 3,
        description: 'test deck',
        options: []
      },
      programList: new Cp2020ProgramList({
        _programs: [
          new NetRunProgram(
            {
              name: 'program1',
              class: { name: 'anti-personal', diff: 10, description: 'test program class' },
              options: [{ name: 'programOption1', diff: 2, description: 'program option' }],
              loaded: false,
              _str: 2,
              mu: 10
            })
        ]
      })
    });
  });

  afterEach(() => {
    manager = null;
    importManager = null;
  });

  it('should create an instance', () => {
    expect(manager).toBeTruthy();
    expect(manager.deck).toBeTruthy();
    expect(manager.programList).toBeTruthy();
  });

  it('should create from other deck object', () => {
    manager = new Cp2020DeckManager(importManager);
    expect(manager).toBeTruthy();
    expect(importManager).toBeTruthy();
    expect(manager.deck).toBeTruthy(importManager);
    console.log(manager);
    console.log(importManager);
    expect(manager.deck.name).toEqual(importManager.deck.name, importManager);
    expect(manager.programList).toBeTruthy(importManager);
    expect(manager.programList.programs.length).toEqual(importManager.programList.programs.length);
    expect(manager.programList.programs[0].name).toEqual(importManager.programList.programs[0].name, importManager);
  });
});
