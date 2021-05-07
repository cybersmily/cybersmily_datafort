import { JsonDataFiles } from './../file-services';
import { map, flatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LifepathFamily, FamilyChart, LifepahtParentOption, Sibling, Siblings } from '../../models/lifepath';
import { Injectable } from '@angular/core';
import { DiceService } from '../dice/dice.service';
import { DataService } from './../file-services';

@Injectable({
  providedIn: 'root'
})
export class FamilyGeneratorService {

  chartData: FamilyChart;

  constructor(private diceService: DiceService, private dataService: DataService) { }


  GenerateFamily(lifepathSource: string): Observable<LifepathFamily> {
    return this.GetChartData()
    .pipe(
      flatMap(data => of(this.CreateFamilyData(data, lifepathSource)))
    );
  }

  private GetChartData(): Observable<FamilyChart> {
    if (!this.chartData) {
      return this.dataService
      .GetJson(JsonDataFiles.CP2020_LIFEPTAH_FAMILY_JSON)
      .pipe(map(data => this.chartData = data));
    }
    return of(this.chartData);
  }

  CreateFamilyData(chartData: FamilyChart, lifepathSource: string): LifepathFamily {
    const family = new LifepathFamily();
    if (lifepathSource !== '') {
      family.familyRanking = this.GenerateRanking(chartData.familyRanking, lifepathSource);
      const isPack = (family.familyRanking.toLowerCase().indexOf('nomad pack') > -1
      || family.familyRanking.toLowerCase().indexOf('pirate fleet') > -1);
      family.siblings = this.GenerateSiblings(isPack, lifepathSource, chartData);
      family.familyBackground = this.GenerateFamilyBackground( family.familyRanking, lifepathSource, chartData);
    }
    return family;
  }

  private GenerateFamilyBackground(ranking: string, source: string, chartData: FamilyChart): string {
    // get parent option
    const parentOptions = this.GetParentOptions(source);
    const isSomething = parentOptions.somethingWrong;
    let familyDetail = parentOptions.details;

    // something happened to parents
    familyDetail += this.GetParentsSomethingHappened(isSomething, source, chartData.parentSomethingHappen);

    // family standing/tragedy
    familyDetail += this.GetFamilyStanding(source, chartData.familyTragedy);
    // get childhood environment
    familyDetail += this.GetChildhoodEnvironment(source, chartData.childhoodEnvironment);
    return familyDetail;
  }

/**
 *
 *
 * @param {string} source
 * @param {*} chart
 * @returns {string}
 * @memberof LifepathFamilyComponent
 */
private GetChildhoodEnvironment(source: string, chart: any): string {
    let results = ' Childhood environment ';
    results  +=  this.diceService.rollOnChart(chart, source);
    return results;
  }

  /**
   *
   *
   * @param {string} source
   * @param {*} chart
   * @returns
   * @memberof LifepathFamilyComponent
   */
  private GetFamilyStanding(source: string, chart: any): string {
    const tar = (source === 'NeoTribe') ? 8 : 7;
    if (this.diceService.generateNumber(1, 10) < tar) {
      return ' ' + this.diceService.rollOnChart(chart, source);
    } else {
      const ok = (source === 'NeoTribe') ? 'Family standing among your clan is good.' : 'Family status is OK.';
      return ' ' + ok;
    }

  }

/**
 *
 *
 * @param {boolean} somethingWrong
 * @param {string} source
 * @param {*} chart
 * @returns
 * @memberof LifepathFamilyComponent
 */
private GetParentsSomethingHappened(somethingWrong: boolean, source: string, chart: any): string {
  if (somethingWrong) {
    return ' ' + this.diceService.rollOnChart(chart, source);
  } else {
    if (source !== 'NeoTribe') {
     return ' Both parents are living.';
    }
  }
  return '';
}

/**
 *
 *
 * @param {*} source
 * @returns {LifepahtParentOption}
 * @memberof LifepathFamilyComponent
 */
private GetParentOptions(source): LifepahtParentOption {
    const results: LifepahtParentOption = {details: '', somethingWrong: false};
    // need to setup the parent options
    if (source === 'NeoTribe') {
      switch (this.diceService.generateNumber(1, 6)) {
        case 1:
          results.details = 'Child of Single Mother, Father unknown. ';
          break;
        case 2:
          results.details = 'Child of Widow/er or Divorcee. ';
          break;
        case 3:
          results.details = 'Child of Two Parents. ';
          break;
        case 4:
          results.details = 'Child of Group Marriage. ';
          break;
        case 5:
          results.details = 'Orphan, Refugee, or Runaway. ';
          break;
        default:
          results.details = 'Feral Child. ';
      }
      switch (this.diceService.generateNumber(1, 6)) {
        case 1:
        case 2:
          results.details += 'Parent(s) Alive. ';
          break;
        case 3:
        case 4:
          results.details  += 'Something happened to one of your parents. ';
          results.somethingWrong = true;
          break;
        default:
          results.details += 'Something happened to both (or all) of your parents. ';
          results.somethingWrong = true;
      }
    } else {
      results.somethingWrong = (this.diceService.generateNumber(1, 10) > 6);
    }
    return results;
  }

  /**
   * generates the Family ranking.
   *
   * @param {*} chart - chart to roll against
   * @param {string} source - the source book to use.
   * @returns {string} - family ranking string
   * @memberof LifepathFamilyComponent
   */
  private GenerateRanking ( chart: any, source: string): string {
    return this.diceService.rollOnChart(chart, source);
  }

  private GetNumberOfSiblings(isPack: boolean, source): number {
    const tar = ( source === 'PacRimJapan') ? 4 : ((source === 'PacRimChina') ? 2 : 7);
    let n = (source === 'PacRimChina') ? this.diceService.generateNumber(1, 6) : this.diceService.generateNumber(1, 10);
    if (source === 'EuroPlus' && isPack) {
      const roll = this.diceService.generateNumber(1, 6);
      if (roll > 4) {
        n = 0;
      } else {
        n = (roll < 2) ? 1 : roll - 1;
      }
    } else {
      n = (n > tar) ? 0 : n;
    }
    return n;
  }

  private GenerateSiblings(isPack: boolean, source: string, chartData: FamilyChart ) {
    const count = this.GetNumberOfSiblings(isPack, source);
    const siblings = new Siblings();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const sibling = new Sibling();
        const isBro = (source === 'PacRimChina') ?
          (this.diceService.generateNumber(1, 6) % 3 === 0) : (this.diceService.generateNumber(1, 10) % 2 === 0);
        sibling.gender = (isBro) ? 'brother' : 'sister';
        const roll = this.diceService.generateNumber(1, 10);
        if (roll === 10) {
          sibling.age = 'same';
        } else if (roll < 6) {
          sibling.age = 'older';
        } else {
          sibling.age = 'younger';
        }
        sibling.feeling = this.diceService.rollOnChart(chartData.siblingFeeling, source);

        siblings.siblings.push(sibling);
      }
    }
    return siblings;
  }
}
