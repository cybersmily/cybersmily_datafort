import { CpRedLifepathCoreRoleChartEntry } from './../models/cp-red-lifepath-core-role-chart-entry';
import { CPRedLifePathEnemy } from './../models/c-p-red-life-path-enemy';
import { CPRedLifePathLoveaffair } from './../models/c-p-red-life-path-loveaffair';
import { CPRedLifePathFriend } from './../models/c-p-red-life-path-friend';
import {
  CPRedLifePathCore,
  CPRedLifePathSettings,
  CpRedLifepathCoreData, CPRedLifepathJumpStartData,
  CPRedLifepathJumpStart,
  CpRedLifepathCoreRoleChartItem
} from './../models';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/data.service';
import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CPRedLifePathService {

  settings: CPRedLifePathSettings;

  constructor(private dice: DiceService) {
    this.settings = new CPRedLifePathSettings();
  }

  resetSettings() {
    this.settings = new CPRedLifePathSettings();
  }

  generateJumpStart(chart: CPRedLifepathJumpStartData): CPRedLifepathJumpStart {
    const lifepath = new CPRedLifepathJumpStart();
    lifepath.background = this.rollOnChart(chart.background);
    lifepath.motivation = this.rollOnChart(chart.motivation);
    lifepath.goals = this.rollOnChart(chart.goals);
    lifepath.personality = this.rollOnChart(chart.personality);
    lifepath.friends = this.rollMultiChart(chart.friends, this.settings.friendsDice);
    lifepath.enemies = this.rollMultiChart(chart.friends, this.settings.enemyDice);
    lifepath.romance = this.rollOnChart(chart.romance);
    return lifepath;
  }

  generateCore(chart: CpRedLifepathCoreData, role: string, param?: any): CPRedLifePathCore {
    return this.createLifePath(chart, role, param);
  }

  private createLifePath(chart: CpRedLifepathCoreData, role: string, param): CPRedLifePathCore {
    const lifepath = new CPRedLifePathCore();
    // appearance
    lifepath.appearance.affectations = this.rollOnChart(chart.affectation);
    lifepath.appearance.clothing = this.rollOnChart(chart.clothing);
    lifepath.appearance.hairstyle = this.rollOnChart(chart.hairstyle);
    // motivations
    lifepath.motivations.feelAboutPeople = this.rollOnChart(chart.feelAboutPeople);
    lifepath.motivations.goal = this.rollOnChart(chart.goals);
    lifepath.motivations.personality = this.rollOnChart(chart.personality);
    lifepath.motivations.valueMost = this.rollOnChart(chart.valueMost);
    lifepath.motivations.valuedPerson = this.rollOnChart(chart.valuedPerson);
    lifepath.motivations.valuedPossession = this.rollOnChart(chart.valuedPerson);
    // culture
    const culture = this.rollOnChart(chart.culture);
    lifepath.culture.name = culture.name;
    lifepath.culture.language = this.rollOnChart(culture.languages);
    // family
    lifepath.family.background = this.rollOnChart(chart.originalBackground);
    lifepath.family.childhoodEnvironment = this.dice.processResult(this.rollOnChart(chart.childhoodEnvironment));
    lifepath.family.familyCrisis = this.dice.processResult(this.rollOnChart(chart.familyCrisis));
    // friends
    lifepath.friends = this.rollMultiChart(chart.friends, this.settings.friendsDice)
      .map(friend => new CPRedLifePathFriend({ who: this.dice.processResult(friend) }));
    // Lovers
    lifepath.loveAffairs = this.rollMultiChart(chart.romance, this.settings.loversDice)
      .map(lover => new CPRedLifePathLoveaffair({ kind: this.dice.processResult(lover) }));
    // Enemies
    const num: number = this.dice.rollMoreDice(this.settings.enemyDice).total;
    for (let i = 0; i < num; i++) {
      lifepath.enemies.push(this.createEnemy(chart));
    }
    // Role
    lifepath.role = this.createRole(chart.roles.filter(entry => entry.role === role)[0], param);

    return lifepath;
  }

  private rollOnChart(chart: Array<any>): any {
    return chart[this.dice.generateNumber(0, chart.length - 1)];
  }

  private rollMultiChart(chart: Array<any>, die: string): Array<any> {
    const results = new Array<any>();
    const num: number = this.dice.rollMoreDice(die).total;
    for (let i = 0; i < num; i++) {
      results.push(this.rollOnChart(chart));
    }
    return results;
  }

  private createEnemy(chart: CpRedLifepathCoreData): CPRedLifePathEnemy {
    const result = new CPRedLifePathEnemy();
    result.who = this.rollOnChart(chart.enemies);
    result.cause = this.dice.processResult(this.rollOnChart(chart.enemyReason));
    result.reaction = this.dice.processResult(this.rollOnChart(chart.enemyReaction));
    result.resources = this.dice.processResult(this.rollOnChart(chart.enemyResources));
    return result;
  }

  private createRole(chart: CpRedLifepathCoreRoleChartEntry, param: any): Array<KeyValue<string, string>> {
    const roleLifepath = new Array<KeyValue<string, string>>();
    chart.charts.forEach(entry => {
      if (entry.startsWith('[')) {
        const values = entry.replace(/[\[|\]]+/g, '');
        const name = chart[values].name;
        const value = this.rollOnChart(chart[values].chart);
        roleLifepath.push({ key: name, value: value });
      } else if (entry.startsWith('(')) {
        const condition = entry.substr(1, entry.indexOf(')') - 1);
        const parameters = condition.split('::');
        let shouldRoll = true;
        parameters.forEach(p => {
          shouldRoll = shouldRoll && param[p];
        });
        if (shouldRoll) {
          const values = entry.replace(/\(.*\)\[/g, '').replace(']', '');
          const name = chart[values].name;
          const value = this.rollOnChart(chart[values].chart);
          roleLifepath.push({ key: name, value: value });
        }

      } else if (entry.startsWith('{')) {
        const parameter = entry.replace(/[\{|\}]+/g, '');
        const values = param[parameter];
        const name = chart[values].name;
        const value = this.rollOnChart(chart[values].chart);
        roleLifepath.push({ key: name, value: value });
      }
    });
    return roleLifepath;
  }
}
