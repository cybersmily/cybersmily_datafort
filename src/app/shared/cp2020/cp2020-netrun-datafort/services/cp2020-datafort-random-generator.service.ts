import { NrDatafortRefDataProgram } from './../models/nr-datafort-ref-data-program';
import { Cp2020Program } from './../../cp2020-netrun-gear/models/cp2020-program';
import { Cp2020DatafortBuilderService } from './cp2020-datafort-builder.service';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { DiceService } from './../../../services/dice/dice.service';
import { Injectable } from '@angular/core';
import { NrDatafortRefData } from '../models/nr-datafort-ref-data';
import { NrDatafortRefDataEntry } from '../models/nr-datafort-ref-data-entry';

@Injectable({
  providedIn: 'root'
})
export class Cp2020DatafortRandomGeneratorService {

  constructor(private diceService: DiceService, private dfBuilderService: Cp2020DatafortBuilderService) { }

  generate(refData: NrDatafortRefData): Cp2020NrDatafort {
    const fort = new Cp2020NrDatafort();
    const aiPersonalityChart = this.createChart(refData.ai.personalities);
    const aiReactionChart = this.createChart(refData.ai.reactions);
    const aiIconChart = this.createChart(refData.ai.icons);
    const skillChart = refData.skills;
    const fileTypeChart = this.createChart(refData.filesTypes);
    const programTypeChart = this.createProgChart(refData.programsTypes);
    const layoutDie = this.diceService.generateNumber(0, refData.layouts.length - 1);

    fort.cpu = this.diceService.generateNumber(1,6);
    if(fort.cpu > 3) {
      // has AI
      fort.ai = {personality: '', reaction: '', icon: ''};
      let die = this.diceService.generateNumber(0, aiPersonalityChart.length - 1);
      fort.ai.personality = aiPersonalityChart[die];
      die = this.diceService.generateNumber(0, aiReactionChart.length - 1);
      fort.ai.reaction = aiReactionChart[die];
      die = this.diceService.generateNumber(0, aiIconChart.length - 1);
      fort.ai.icon = aiIconChart[die];
    }
    // generate the memory
    const muNum = fort.cpu * 4;
    for(let i = 0; i < muNum; i++) {
      const mu = this.diceService.generateNumber(1,10);
      let die = this.diceService.generateNumber(0, fileTypeChart.length - 1);
      let filetype = fileTypeChart[die];
      die = this.diceService.generateNumber(0, fileTypeChart.length - 1);
      filetype += `, ${fileTypeChart[die]}`;
      fort.mu.push({key: filetype, value: mu});
    }
    // roll for datafort
    fort.datawallStr = fort.cpu + this.diceService.generateNumber(1,3);
    // roll for codegate
    for(let i = 0; i < fort.cpu; i++) {
      const str = fort.cpu + this.diceService.generateNumber(1,3);
      fort.codegates.push({str: str, coord: refData.codegateLayout[layoutDie][i]});
    }
    // roll for skills
    for(let i = 0; i < 5; i++ ){
      let die = this.diceService.generateNumber(0, skillChart.length - 1);
      const skill = skillChart[die];
      const rank = this.diceService.generateNumber(4, 10);
      fort.skills.push({key: skill, value: rank});
    }
    // roll for defenses
    const defeneseNum = fort.cpu + this.diceService.generateNumber(1,6);
    for(let i = 0; i < defeneseNum; i++) {
      let die = this.diceService.generateNumber(0, programTypeChart.length - 1);
      let progType = programTypeChart[die];
      let progChart = this.createChart(refData.programs[progType]);
      die = this.diceService.generateNumber(0, progChart.length - 1);
      let prog = progChart[die];
      const program = new Cp2020Program();
      program.name = prog;
      fort.defenses.push({name: prog, program: program, coord: refData.defenseLayout[layoutDie][i]});
    }
    // get layout
    const layout = refData.layouts[layoutDie];
    fort.datawallNodes = [...layout];

    return fort;
  }

  private createChart(entries: Array<NrDatafortRefDataEntry>): Array<string> {
    const results = new Array<string>();
    entries?.forEach( entry => {
      for(let i = 0; i < entry.weight;i++) {
        results.push(entry.name);
      }
    });
    return results;
  }


  private createProgChart(entries: Array<NrDatafortRefDataProgram>): Array<string> {
    const results = new Array<string>();
    entries?.forEach( entry => {
      for(let i = 0; i < entry.weight;i++) {
        results.push(entry.prop);
      }
    });
    return results;
  }
}
