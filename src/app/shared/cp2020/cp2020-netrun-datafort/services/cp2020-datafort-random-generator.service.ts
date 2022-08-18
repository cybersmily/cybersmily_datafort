import { KeyValue } from '@angular/common';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { NrDatafortRefDataProgram } from './../models/nr-datafort-ref-data-program';
import { Cp2020Program } from './../../cp2020-netrun-gear/models';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { DiceService } from './../../../services/dice/dice.service';
import { Injectable } from '@angular/core';
import { NrDatafortRefData } from '../models/nr-datafort-ref-data';
import { NrDatafortRefDataEntry } from '../models/nr-datafort-ref-data-entry';

@Injectable({
  providedIn: 'root',
})
export class Cp2020DatafortRandomGeneratorService {
  private _progList: Array<any>;
  constructor(
    private diceService: DiceService,
    private dataService: DataService
  ) {}

  generate(refData: NrDatafortRefData): Cp2020NrDatafort {
    if (this._progList === null) {
      const progList = this.dataService.GetJson<Array<any>>(
        JsonDataFiles.CP2020_PROGRAM_LIST_JSON
      );
    }
    const fort = new Cp2020NrDatafort();
    const skillChart = refData.skills;

    const programTypeChart = this.createProgChart(refData.programsTypes);
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
    for (let i = 0; i < fort.cpu; i++) {
      const str = fort.cpu + this.diceService.generateNumber(1, 3);
      fort.codegates.push({
        str: str,
        coord: refData.codegateLayout[layoutDie][i],
      });
    }
    // roll for skills
    for (let i = 0; i < 5; i++) {
      let die = this.diceService.generateNumber(0, skillChart.length - 1);
      const skill = skillChart[die];
      const rank = this.diceService.generateNumber(4, 10);
      fort.skills.push({ key: skill, value: rank });
    }
    // roll for defenses/programs
    const defeneseNum = fort.cpu + this.diceService.generateNumber(1, 6);
    for (let i = 0; i < defeneseNum; i++) {
      let die = this.diceService.generateNumber(0, programTypeChart.length - 1);
      let progType = programTypeChart[die];
      let progChart = this.createChart(refData.programs[progType]);
      die = this.diceService.generateNumber(0, progChart.length - 1);
      let prog = progChart[die];
      const program = new Cp2020Program();
      program.name = prog;
      fort.defenses.push({
        name: prog,
        program: program,
        coord: refData.defenseLayout[layoutDie][i],
      });
    }
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
    const aiPersonalityChart = this.createChart(refData.ai.personalities);
    const aiReactionChart = this.createChart(refData.ai.reactions);
    const aiIconChart = this.createChart(refData.ai.icons);
    const ai = { personality: '', reaction: '', icon: '' };
    let die = this.diceService.generateNumber(0, aiPersonalityChart.length - 1);
    ai.personality = aiPersonalityChart[die];
    die = this.diceService.generateNumber(0, aiReactionChart.length - 1);
    ai.reaction = aiReactionChart[die];
    die = this.diceService.generateNumber(0, aiIconChart.length - 1);
    ai.icon = aiIconChart[die];

    return ai;
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
