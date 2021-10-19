import { Cp2020ProgramList } from './cp2020-program-list';
import { Cp2020Cyberdeck } from './cp2020-cyberdeck';
import { Cp2020Program } from './cp2020-program';
import { CyberdeckManager } from './cyberdeck-manager';
import { Cp2020CyberdeckManager } from './cp2020-cyberdeck-manager';

describe('Cp2020CyberdeckManager', () => {
  let manager: Cp2020CyberdeckManager;
  let importManager: Cp2020CyberdeckManager;


  beforeEach(() => {
    manager = new Cp2020CyberdeckManager();
    importManager = new Cp2020CyberdeckManager({
      deck: {
        name: 'test',
        type: { name: 'cellular', description: '', cost: 1000 },
        totalMU: 20,
        doubleMu: true,
        dataWall: 5,
        speed: 3,
        description: 'test deck',
        options: []
      },
      programList: new Cp2020ProgramList({
        _programs: [
          new Cp2020Program(
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
    manager = new Cp2020CyberdeckManager(importManager);
    expect(manager).toBeTruthy();
    expect(importManager).toBeTruthy();
    expect(manager.deck).toBeTruthy(importManager);
    expect(manager.deck.name).toEqual(importManager.deck.name, importManager);
    expect(manager.programList).toBeTruthy(importManager);
    expect(manager.programList.programs.length).toEqual(importManager.programList.programs.length);
    expect(manager.programList.programs[0].name).toEqual(importManager.programList.programs[0].name, importManager);
  });
});
