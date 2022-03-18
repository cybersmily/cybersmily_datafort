import { CpRedAppFiles } from './../../../shared/services/file-services/enum/cpred-app-files';
import { DataService, JsonDataFiles } from './../../../shared/services/file-services';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CpRedLifepathCoreRoleChartEntry } from './../../../shared/cpred/c-p-red-lifepath/models';
import { CPRedLifePathService } from './../../../shared/cpred/c-p-red-lifepath/services/c-p-red-life-path.service';
import { KeyValue } from '@angular/common';
import { DiceService } from './../../../shared/services/dice/dice.service';
import { CpRedDate } from './../../models/cp-red-date';
import { CpRedDatingMainChart } from './../../models/cp-red-dating-main-chart';
import { Injectable } from '@angular/core';
import { CpRedDatingOutcome } from '../../models';
import { NameChart } from './../../../shared/models';
import { CHOICE_DELIMITER, DICEROLLING_DELIMITER, KEYWORD_DELIMITER, ROLEPATH_DELIMITER, VARIABLE_DELIMITER_END, VARIABLE_DELIMITER_START } from '../../models/constants';

@Injectable({
  providedIn: 'root'
})
export class CpRedDateGeneratorService {

  private _roles: Array<string> = [
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
  private _chart:CpRedDatingMainChart;
  private _roleLifepah: Array<CpRedLifepathCoreRoleChartEntry>;

  private _cpDate: BehaviorSubject<CpRedDate> = new BehaviorSubject<CpRedDate>( new CpRedDate());
  currentDate = this._cpDate.asObservable();

  constructor(private dice: DiceService, private lifepathService: CPRedLifePathService, private dataService: DataService) { }

  generate(settings?: any) {
    if (this._chart && this._roleLifepah) {
      this._cpDate.next(this.generateDate(this._chart, this._roleLifepah, settings));
    } else {
      forkJoin({
        dateData: this.dataService.GetJson(CpRedAppFiles.DATING_CHARTS),
        roleData: this.dataService.GetJson(JsonDataFiles.CPRED_LIFEPATH_CHART_JSON)
      }).subscribe(({dateData, roleData}) => {
        this._chart = dateData.cpred;
        this._roleLifepah = roleData?.corebook?.roles;
        this._cpDate.next(this.generateDate(this._chart, this._roleLifepah, settings));
      });
    }
  }

  private generateDate(dateCharts: CpRedDatingMainChart, rolepathChart: Array<CpRedLifepathCoreRoleChartEntry>, settings?: any): CpRedDate {
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

  private generateKeyword(chart: Array<string>): string {
    return this.dice.rollRandomItem(chart);
  }

  private generateLocation(chart: Array<KeyValue<string, string>>): KeyValue<string, string> {
    return this.dice.rollRandomItem(chart);
  }

  private generateActivity(chart: Array<string>): string {
    return this.dice.rollRandomItem(chart);
  }

  private generateType(chart: Array<string>): string {
    return this.dice.rollRandomItem(chart);
  }

  private generateEvent(chart: Array<string>, keywords: Array<string>, keywordChart: Array<string>, variables: Array<NameChart>, roleChart: Array<CpRedLifepathCoreRoleChartEntry>): string {
    const event = this.dice.rollRandomItem(chart);
    const result = this.processEvent(event, keywords, keywordChart, variables, roleChart);
    return result;
  }

  private generateOutcome(chart: Array<CpRedDatingOutcome>): string {
    const outcome =  this.dice.rollRandomItem(chart);
    let result = outcome.outcome;
    if(outcome.chart) {
      const followup = this.dice.rollRandomItem(outcome.chart);
      result += ` ${followup}`;
    }
    return result;
  }

  private processEvent(event: string, keywords: Array<string>, keywordChart: Array<string>, variables: Array<NameChart>, roleChart: Array<CpRedLifepathCoreRoleChartEntry>): string {
    if( event.includes(KEYWORD_DELIMITER)) {
      // replace key word
      event = this.processKeyword(event, keywords, keywordChart);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes(CHOICE_DELIMITER)) {
      event = this.processChoices(event);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes(VARIABLE_DELIMITER_START)) {
      event = this.processVariable(event, variables);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes(DICEROLLING_DELIMITER)) {
      // roll dice and replace
      event = this.processDice(event);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    } else if( event.includes(ROLEPATH_DELIMITER)) {
      event = this.processLifepath(event, roleChart);
      return this.processEvent(event, keywords, keywordChart, variables, roleChart);
    }
    return event;
  }

  private processKeyword(event: string, keywords: Array<string>, keywordChart: Array<string>): string {
    let keyword = '';
    do {
      keyword = this.dice.rollRandomItem(keywordChart);
    } while(keywords.includes(keyword));
    return event.replace(KEYWORD_DELIMITER, keyword);
  }

  private processChoices(event: string ): string {
    const parseString = event.substring(event.indexOf(CHOICE_DELIMITER) + 2);
    const options = parseString.substring(0, parseString.indexOf(CHOICE_DELIMITER));
    const value = this.dice.rollRandomItem(options.split('|'));
    return event.replace(`${CHOICE_DELIMITER}${options}${CHOICE_DELIMITER}`, value);
  }

  private processVariable(event: string, variables: Array<NameChart>): string {
    const parseString = event.substring(event.indexOf(VARIABLE_DELIMITER_START) + 2);
    const chartName = parseString.substring(0, parseString.indexOf(VARIABLE_DELIMITER_END));
    const chart = variables.find(variable => variable.name === chartName )?.chart;
    if(chart) {
      const value = this.dice.rollRandomItem(chart);
      return event.replace(`${VARIABLE_DELIMITER_START}${chartName}${VARIABLE_DELIMITER_END}`, value);
    }
    return event.replace(VARIABLE_DELIMITER_START, ' ').replace(VARIABLE_DELIMITER_END, ' ');
  }

  private processDice(event: string): string {
    const parseString = event.substring(event.indexOf(DICEROLLING_DELIMITER) + 2);
    const diceRoll = parseString.substring(0, parseString.indexOf(DICEROLLING_DELIMITER));
    const results = Math.ceil(this.dice.rollMoreDice(diceRoll).total);
    return event.replace(`${DICEROLLING_DELIMITER}${diceRoll}${DICEROLLING_DELIMITER}`, results.toString());
  }

  private processLifepath(event: string, roleChart: Array<CpRedLifepathCoreRoleChartEntry>): string {
    const role = this.dice.rollRandomItem(this._roles);
    const charts = roleChart.find(r => r.role === role);
    const rolepath = this.lifepathService.createRole(charts, null);
    let result = rolepath.map( r => `${r.key} - ${r.value}`).join('. ');
    result = result.replace(`you're`,`they're`).replace(/your/gi, 'their').replace(/you/gi, 'them');
    return event.replace(ROLEPATH_DELIMITER, `They are a ${role}. ${result}`);
  }
}
