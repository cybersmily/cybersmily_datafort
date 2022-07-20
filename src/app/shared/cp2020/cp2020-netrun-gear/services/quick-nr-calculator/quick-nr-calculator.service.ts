import { CP2020_PROGRAM_TYPE } from './../../enums/cp2020-program-type';
import { Program, ProgramList, Cyberdeck } from './../../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuickNrCalculatorService {
  constructor() {}

  caculatePM(deck: Cyberdeck, programList: ProgramList): number {
    let antiSystemMod = 0;
    let stealthEvasionMod = 0;
    let antiProgramMod = 0;
    programList.programs
      .filter((program) => program.loaded)
      .forEach((program) => {
        antiSystemMod = this.compareStr(
          CP2020_PROGRAM_TYPE.ANTI_SYSTEM,
          antiSystemMod,
          program
        );
        antiProgramMod = this.compareStr(
          CP2020_PROGRAM_TYPE.ANTI_PROGRAM,
          antiProgramMod,
          program
        );
        stealthEvasionMod = this.compareStr(
          CP2020_PROGRAM_TYPE.EVASION,
          stealthEvasionMod,
          program
        );
        stealthEvasionMod = this.compareStr(
          CP2020_PROGRAM_TYPE.STEALTH,
          stealthEvasionMod,
          program
        );
      });
    return (
      deck.speed +
      this.programBonus(antiSystemMod) +
      this.programBonus(antiProgramMod) +
      this.programBonus(stealthEvasionMod)
    );
  }

  compareStr(
    programClass: string,
    currentStr: number,
    program: Program
  ): number {
    if (
      program.class.name.toLowerCase().startsWith(programClass) &&
      program.strength > currentStr
    ) {
      return program.strength;
    }
    return currentStr;
  }

  programBonus(strength: number): number {
    return Math.ceil(strength / 3);
  }
}
