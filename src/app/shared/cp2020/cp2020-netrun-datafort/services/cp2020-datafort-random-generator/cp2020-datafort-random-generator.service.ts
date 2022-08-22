import { Cp2020ProgramDataService } from './../../../cp2020-netrun-gear/services';
import { Observable, of, map } from 'rxjs';
import { NrDatafortDefense } from '../../models/nr-datafort-defense';
import { KeyValue } from '@angular/common';
import { JsonDataFiles } from '../../../../services/file-services/json-data-files';
import { DataService } from '../../../../services/file-services/dataservice/data.service';
import { NrDatafortRefDataProgram } from '../../models/nr-datafort-ref-data-program';
import { Cp2020Program, Program } from '../../../cp2020-netrun-gear/models';
import { Cp2020NrDatafort } from '../../models/cp2020-nr-datafort';
import { DiceService } from '../../../../services/dice/dice.service';
import { Injectable } from '@angular/core';
import { NrDatafortRefData } from '../../models/nr-datafort-ref-data';
import { NrDatafortRefDataEntry } from '../../models/nr-datafort-ref-data-entry';
import { NrDatafortCodegate } from '../../models/nr-datafort-codegate';

@Injectable({
  providedIn: 'root',
})
export class Cp2020DatafortRandomGeneratorService {
  private _progList: Array<any> = null;

  constructor(
    private diceService: DiceService,
    private programDataService: Cp2020ProgramDataService
  ) {}

  generate(refData: NrDatafortRefData): Observable<Cp2020NrDatafort> {
    if (this._progList === null) {
      return this.programDataService.cp2020Programs.pipe(
        map((progList) => {
          this._progList = progList;
          return this.createDataFort(refData, this._progList);
        })
      );
    }
    return of(this.createDataFort(refData, this._progList));
  }

  private createDataFort(
    refData: NrDatafortRefData,
    programList: Array<Cp2020Program>
  ): Cp2020NrDatafort {
    const fort = new Cp2020NrDatafort();

    const layoutDie = this.diceService.generateNumber(
      0,
      refData.layouts.length - 1
    );

    fort.cpu = this.diceService.generateNumber(1, 6);
    if (fort.cpu > 3) {
      fort.ai = this.createAI(refData);
    }
    // generate the memory
    fort.mu = this.createMemory(fort.cpu, refData);
    // roll for datafort
    fort.datawallStr = fort.cpu + this.diceService.generateNumber(1, 3);
    // roll for codegate
    fort.codegates = this.createCodeGates(fort.cpu, layoutDie, refData);
    // roll for skills
    fort.skills = this.createSkillList(refData);
    // roll for defenses/programs
    fort.defenses = this.createProgramList(
      fort.cpu,
      layoutDie,
      refData,
      programList
    );
    // get layout
    const layout = refData.layouts[layoutDie];
    fort.datawallNodes = [...layout];

    return fort;
  }

  private createAI(refData: NrDatafortRefData): {
    personality: string;
    reaction: string;
    icon: string;
  } {
    // has AI
    const aiPersonalityChart = this.createChart(refData?.ai?.personalities);
    const aiReactionChart = this.createChart(refData?.ai?.reactions);
    const aiIconChart = this.createChart(refData?.ai?.icons);
    const ai = { personality: '', reaction: '', icon: '' };
    let die = this.diceService.generateNumber(0, aiPersonalityChart.length - 1);
    ai.personality = aiPersonalityChart[die];
    die = this.diceService.generateNumber(0, aiReactionChart.length - 1);
    ai.reaction = aiReactionChart[die];
    die = this.diceService.generateNumber(0, aiIconChart.length - 1);
    ai.icon = aiIconChart[die];

    return ai;
  }

  private createCodeGates(
    cpu: number,
    layout: number,
    refData: NrDatafortRefData
  ): Array<NrDatafortCodegate> {
    const codeGateList = new Array<NrDatafortCodegate>();
    for (let i = 0; i < cpu; i++) {
      const str = cpu + this.diceService.generateNumber(1, 3);
      codeGateList.push({
        str: str,
        coord: refData.codegateLayout[layout][i],
      });
    }
    return codeGateList;
  }

  private createMemory(
    cpu: number,
    refData: NrDatafortRefData
  ): Array<KeyValue<string, number>> {
    const fileTypeChart = this.createChart(refData.filesTypes);
    const muList = new Array<KeyValue<string, number>>();
    const muNum = cpu * 4;
    for (let i = 0; i < muNum; i++) {
      const mu = this.diceService.generateNumber(1, 10);
      let die = this.diceService.generateNumber(0, fileTypeChart.length - 1);
      let filetype = fileTypeChart[die];
      die = this.diceService.generateNumber(0, fileTypeChart.length - 1);
      filetype += `, ${fileTypeChart[die]}`;
      muList.push({ key: filetype, value: mu });
    }
    return muList;
  }

  private createSkillList(
    refData: NrDatafortRefData
  ): Array<KeyValue<string, number>> {
    const skillChart = refData.skills;
    const skillList = new Array<KeyValue<string, number>>();
    for (let i = 0; i < 5; i++) {
      let die = this.diceService.generateNumber(0, skillChart.length - 1);
      const skill = skillChart[die];
      const rank = this.diceService.generateNumber(4, 10);
      skillList.push({ key: skill, value: rank });
    }
    return skillList;
  }

  private createProgramList(
    cpu: number,
    layout: number,
    refData: NrDatafortRefData,
    programData: Array<Program>
  ): Array<NrDatafortDefense> {
    const programTypeChart = this.createProgChart(refData.programsTypes);
    const programList = new Array<NrDatafortDefense>();
    const defeneseNum = cpu + this.diceService.generateNumber(1, 6);
    for (let i = 0; i < defeneseNum; i++) {
      let die = this.diceService.generateNumber(0, programTypeChart.length - 1);
      let progType = programTypeChart[die];
      let progChart = this.createChart(refData.programs[progType]);
      die = this.diceService.generateNumber(0, progChart.length - 1);
      const result = {
        name: progChart[die],
        program: new Cp2020Program(),
        coord: refData.defenseLayout[layout][i],
      };
      console.log(result);
      const index = programData.findIndex(
        (prog) => prog.name.toLowerCase() === result.name.toLowerCase()
      );
      if (index > -1) {
        result.program = new Cp2020Program(programData[index]);
      }
      programList.push(result);
    }
    return programList;
  }

  private createChart(entries: Array<NrDatafortRefDataEntry>): Array<string> {
    const results = new Array<string>();
    entries?.forEach((entry) => {
      for (let i = 0; i < entry.weight; i++) {
        results.push(entry.name);
      }
    });
    return results;
  }

  private createProgChart(
    entries: Array<NrDatafortRefDataProgram>
  ): Array<string> {
    const results = new Array<string>();
    entries?.forEach((entry) => {
      for (let i = 0; i < entry.weight; i++) {
        results.push(entry.prop);
      }
    });
    return results;
  }
}
