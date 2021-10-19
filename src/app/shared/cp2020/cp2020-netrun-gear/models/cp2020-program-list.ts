import { Cp2020Program } from './cp2020-program';
import { ProgramList } from './program-list';
import { Program } from './program';

export class Cp2020ProgramList implements ProgramList {

  private _programs: Array<Cp2020Program>;

  constructor(param?: any) {
    this._programs = new Array<Cp2020Program>();
    if (param) {
      if (param._programs && Array.isArray(param._programs)) {
        param._programs.forEach((p) => {
          this.add(p);
        });
      }
      if (param.programs && Array.isArray(param.programs)) {
        param.programs.forEach((p) => {
          this.add(p);
        });
      }
    }
  }

  get programs(): Array<Cp2020Program> {
    return this._programs;
  }

  get usedMU(): number {
    return this._programs.reduce( (a, b) => a + ( b.loaded ? b.mu : 0), 0);
  }

  get totalCost(): number {
    return this._programs.reduce( (a, b) => a +  b.cost, 0);
  }

  getByIndex(index: number): Cp2020Program {
    if (index > -1 && index < this._programs.length) {
      return this._programs[index];
    }
    return undefined;
  }

  setLoaded(index: number) {
    if (index > -1 && index < this._programs.length) {
      this._programs[index].loaded = !this._programs[index].loaded;
    }
  }

  getByName(name: string): Cp2020Program {
    const i = this._programs.findIndex(p  => p.name === name);
    if (i > -1) {
      return this.getByIndex(i);
    }
    return undefined;
  }

  add(program: Program) {
    if (!this._programs.some( p => p.name === program.name)) {
      this._programs.push(new Cp2020Program(program));
      this._programs.sort( (a, b) => {
        if ( a.class?.name?.toLowerCase() === b.class?.name?.toLowerCase() ) {
          return a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1;

        }
        return a.class?.name?.toLowerCase() > b.class?.name?.toLowerCase() ? 1 : -1;
      });
    }
  }

  remove(program: Program) {
    const i = this._programs.findIndex(p => p.name === program.name);
    if (i > -1) {
      this._programs.splice(i, 1);
    }
  }

  removeByIndex(index: number) {
    if (index > -1 && index < this._programs.length) {
      this._programs.splice(index, 1);
    }
  }

  updateProgram(prog: Cp2020Program) {
    const i = this._programs.findIndex(p => p.name === prog.name);
    if (i > -1 ) {
      // update the existing program
      this._programs[i] = new Cp2020Program(prog);
    } else {
      // add a new program.
      this.add(prog);
    }
  }

  clear() {
    this._programs = new Array<Cp2020Program>();
  }
}
