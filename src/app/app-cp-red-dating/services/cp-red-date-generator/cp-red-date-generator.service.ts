import { CpRedLifepathCoreRoleChartEntry } from './../../../shared/cpred/c-p-red-lifepath/models/cp-red-lifepath-core-role-chart-entry';
import { CPRedLifePathService } from './../../../shared/cpred/c-p-red-lifepath/services/c-p-red-life-path.service';
import { KeyValue } from '@angular/common';
import { DiceService } from './../../../shared/services/dice/dice.service';
import { CpRedDate } from './../../models/cp-red-date';
import { CpRedDatingMainChart } from './../../models/cp-red-dating-main-chart';
import { Injectable } from '@angular/core';
import { CpRedDatingOutcome } from '../../models';
import { NameChart } from './../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CpRedDateGeneratorService {

  private roles: Array<string> = [
    'Exec',
    'Fixer',
    'Lawman',
    'Media',
    'Medtech',
    'Netrunner',
    'Nomad',
    'Rockerboy',
    'Solo',
    'Tech'
  ];

  constructor(private dice: DiceService, private lifepathService: CPRedLifePathService) { }

  generateDate(dateCharts: CpRedDatingMainChart, rolepathChart: Array<CpRedLifepathCoreRoleChartEntry>, settings?: any): CpRedDate {
    const redDate = new CpRedDate();
    // generate keywords, default 2
    const count = settings?.keywordCount ?? 2;
    for(let i = 0; i < count; i++) {
      redDate.keywords.push(this.generateKeyword(dateCharts.keywords));
    }
    // determine location of date
    const location = this.generateLocation(dateCharts.locations);
    redDate.location = location.key;

    // determine the activity done on the date
    redDate.activity = this.generateActivity(dateCharts.activity.find( act => act.name === location.value).chart);

    // determine type of date
    redDate.type = this.generateType(dateCharts.datetypes.charts);

    if(redDate.type !== 'ghosted') {
      const dateTypeChart = dateCharts.datetypes.types.find( type => type.name === redDate.type);
      // beginning of the date
      redDate.beginning = this.generateEvent(dateTypeChart.beginning, redDate.keywords, dateCharts.keywords, dateCharts.variables, rolepathChart);
      // middle of the date
      redDate.middle = this.generateEvent(dateTypeChart.middle, redDate.keywords, dateCharts.keywords, dateCharts.variables, rolepathChart);
      // end of the date
      redDate.end = this.generateEvent(dateTypeChart.end, redDate.keywords, dateCharts.keywords, dateCharts.variables, rolepathChart);
      // what was the outcome
      if(!redDate.end.includes("!!")) {
        redDate.outcome = this.generateOutcome(dateCharts.postdate.chart);
      } else {
        redDate.end = redDate.end.replace('!!', '');
        redDate.outcome = "They want to go on another date.";
      }
    } else {
      redDate.outcome = 'You were ghosted.';
    }
    return redDate;
  }

  generateKeyword(chart: Array<string>): string {
    return this.dice.rollRandomItem(chart);
  }

  generateLocation(chart: Array<KeyValue<string, string>>): KeyValue<string, string> {
    return this.dice.rollRandomItem(chart);
  }

  generateActivity(chart: Array<string>): string {
    return this.dice.rollRandomItem(chart);
  }

  generateType(chart: Array<string>): string {
    return this.dice.rollRandomItem(chart);
  }

  generateEvent(chart: Array<string>, keywords: Array<string>, keywordChart: Array<string>, variables: Array<NameChart>, roleChart: Array<CpRedLifepathCoreRoleChartEntry>): string {
    const event = this.dice.rollRandomItem(chart);
    const result = this.processEvent(event, keywords, keywordChart, variables, roleChart);
    return result;
  }

  generateOutcome(chart: Array<CpRedDatingOutcome>): string {
    const outcome =  this.dice.rollRandomItem(chart);
    let result = outcome.outcome;
    if(outcome.chart) {
      const followup = this.dice.rollRandomItem(outcome.chart);
      result += ` ${followup}`;
    }
    return result;
  }

  processEvent(event: string, keywords: Array<string>, keywordChart: Array<string>, variables: Array<NameChart>, roleChart: Array<CpRedLifepathCoreRoleChartEntry>): string {
    if( event.includes('--keyword--')) {
      // replace key word
      event = this.processKeyword(event, keywords, keywordChart);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes('||')) {
      event = this.processChoices(event);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes('[[')) {
      event = this.processVariable(event, variables);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes('==')) {
      // roll dice and replace
      event = this.processDice(event);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes('**rolepath**')) {
      event = this.processLifepath(event, roleChart);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    }
    return event;
  }

  processKeyword(event: string, keywords: Array<string>, keywordChart: Array<string>): string {
    let keyword = '';
    do {
      keyword = this.dice.rollRandomItem(keywordChart);
    } while(keywords.includes(keyword));
    return event.replace(`--keyword--`, keyword);
  }

  processChoices(event: string ): string {
    const parseString = event.substring(event.indexOf('||') + 2);
    const options = parseString.substring(0, parseString.indexOf('||'));
    const value = this.dice.rollRandomItem(options.split('|'));
    return event.replace(`||${options}||`, value);
  }

  processVariable(event: string, variables: Array<NameChart>): string {
    const parseString = event.substring(event.indexOf('[[') + 2);
    const chartName = parseString.substring(0, parseString.indexOf(']]'));
    const chart = variables.find(variable => variable.name === chartName )?.chart;
    if(chart) {
      const value = this.dice.rollRandomItem(chart);
      return event.replace(`[[${chartName}]]`, value);
    }
    return event.replace('[[', ' ').replace(']]', ' ');
  }

  processDice(event: string): string {
    const parseString = event.substring(event.indexOf('==') + 2);
    const diceRoll = parseString.substring(0, parseString.indexOf('=='));
    const results = Math.ceil(this.dice.rollMoreDice(diceRoll).total);
    return event.replace(`==${diceRoll}==`, results.toString());
  }

  processLifepath(event: string, roleChart: Array<CpRedLifepathCoreRoleChartEntry>): string {
    console.log('rolepath');
    const role = this.dice.rollRandomItem(this.roles);
    const charts = roleChart.find(r => r.role === role);
    const rolepath = this.lifepathService.createRole(charts, null);
    let result = rolepath.map( r => `${r.key} - ${r.value}`).join('. ');
    result = result.replace(`you're`,`they're`).replace(/your/gi, 'their').replace(/you/gi, 'them');
    console.log(result);
    return event.replace(`**rolepath**`, `They are a ${role}. ${result}`);
  }
}
