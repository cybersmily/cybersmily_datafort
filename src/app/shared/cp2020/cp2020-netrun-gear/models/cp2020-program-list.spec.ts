import { Cp2020Program } from './cp2020-program';
import { ProgramList } from './program-list';
import { Cp2020ProgramList } from './cp2020-program-list';

describe('Cp2020ProgramList', () => {
  let list: Cp2020ProgramList;
  let importList: ProgramList;
  let loadedList: Cp2020ProgramList;
  let testValues: Array<{
    loaded: boolean;
    mu: number;
    diff: number;
    cost: number;
  }>;

  beforeEach(() => {
    list = new Cp2020ProgramList();
    importList = {
      programs: [],
      usedMU: 0,
      totalCost: 0,
    };

    for (let i = 0; i < 10; i++) {
      importList.programs.push(
        new Cp2020Program({
          name: `program${i}`,
          class: { name: 'anti-program', diff: i * 5, description: '' },
          _str: i,
          description: '',
          icon: '',
          options: [],
          loaded: i % 2 === 0 ? true : false,
        })
      );
    }

    testValues = new Array<{
      loaded: boolean;
      mu: number;
      diff: number;
      cost: number;
    }>();
    // create an array that has all the calculated values of the programs
    for (let i = 0; i < 10; i++) {
      testValues.push({
        loaded: importList.programs[i].loaded,
        mu: importList.programs[i].mu,
        diff: importList.programs[i].diff,
        cost: importList.programs[i].cost,
      });
    }

    loadedList = new Cp2020ProgramList(importList);
  });

  afterEach(() => {
    list = null;
    importList = null;
    testValues = null;
  });

  it('should create an instance', () => {
    expect(list).toBeTruthy();
    expect(list.programs).toBeTruthy();
  });
  it('should create an instance form parameter', () => {
    expect(loadedList).toBeTruthy();
    expect(loadedList.programs).toBeTruthy();
    expect(loadedList.programs.length).toEqual(importList.programs.length);
  });

  it('should calculate used MU', () => {
    let sum = testValues.filter((v) => v.loaded).reduce((a, b) => a + b.mu, 0);
    expect(loadedList.usedMU).toEqual(sum);
    loadedList.programs[2].loaded = false;
    loadedList.programs[8].loaded = false;
    sum -= loadedList.programs[2].mu;
    sum -= loadedList.programs[8].mu;
    expect(loadedList.usedMU).toEqual(sum);
  });

  it('should calculate total cost', () => {
    let sum = testValues.reduce((a, b) => a + b.cost, 0);
    expect(loadedList.totalCost).toEqual(sum);
    sum -= loadedList.programs[2].cost;
    sum -= loadedList.programs[8].cost;
    loadedList.removeByIndex(8);
    loadedList.removeByIndex(2);
    expect(loadedList.totalCost).toEqual(sum);
  });

  it('should set program to loaded', () => {
    for (let i = 0; i < loadedList.programs.length; i++) {
      const value = !loadedList.programs[i].loaded;
      loadedList.setLoaded(i);
      expect(loadedList.getByIndex(i).loaded).toEqual(value);
    }
  });

  it('should get program by name', () => {
    let program = loadedList.getByName('program5');
    expect(program).toBeTruthy();
    expect(program.name).toEqual('program5');
    expect(program.strength).toEqual(5);
    program = loadedList.getByName('program10');
    expect(program).toBeFalsy();
  });

  it('should get program by index', () => {
    let program = loadedList.getByIndex(5);
    expect(program).toBeTruthy();
    expect(program.name).toEqual('program5');
    expect(program.strength).toEqual(5);
    program = loadedList.getByIndex(15);
    expect(program).toBeFalsy();
  });

  it('should add pogram to list', () => {
    for (let i = 0; i < 5; i++) {
      list.add(
        new Cp2020Program({
          name: `program${i}`,
          class: { name: 'anti-program', diff: i * 5, description: '' },
          _str: i,
          description: '',
          icon: '',
          options: [],
          loaded: i % 2 === 0 ? true : false,
        })
      );
    }
    expect(list.programs.length).toEqual(5);
    expect(list.programs.length).not.toEqual(4);
    expect(list.programs.length).not.toEqual(6);
    expect(list.getByIndex(3)).toBeTruthy();
    expect(list.getByIndex(5)).toBeFalsy();
  });

  it('should remove program by program form list', () => {
    const program1 = loadedList.getByIndex(5);
    const program2 = loadedList.getByIndex(0);
    loadedList.remove(program1);
    loadedList.remove(program2);
    expect(loadedList.programs.length).toEqual(8);
    loadedList.remove(program1);
    expect(loadedList.programs.length).toEqual(8);
    expect(loadedList.getByName(program1.name)).toBeUndefined();
    expect(loadedList.getByName(program2.name)).toBeUndefined();
  });

  it('should remove program by index form list', () => {
    const program = loadedList.getByIndex(5);
    loadedList.removeByIndex(5);
    loadedList.removeByIndex(0);
    expect(loadedList.programs.length).toEqual(8);
    loadedList.removeByIndex(9);
    expect(loadedList.programs.length).toEqual(8);
    expect(loadedList.getByName(program.name)).toBeUndefined();
  });

  it('should update program in list', () => {
    const program = loadedList.getByIndex(5);
    program.name = 'testProgram';
    program.strength = 1;
    program.class.diff = 10;
    loadedList.updateProgram(program);
    expect(loadedList.getByIndex(5).name).toEqual(program.name);
    expect(loadedList.getByIndex(5).strength).toEqual(program.strength);
    expect(loadedList.getByIndex(5).mu).toEqual(program.mu);
    expect(loadedList.getByIndex(5).cost).toEqual(program.cost);
    expect(loadedList.getByIndex(5).diff).toEqual(program.diff);
  });

  it('should clear list', () => {
    const program = loadedList.getByIndex(5);
    expect(loadedList.programs.length).toEqual(10);
    loadedList.clear();
    expect(loadedList.programs.length).toEqual(0);
    expect(loadedList.getByName(program.name)).toBeUndefined();
  });
});
