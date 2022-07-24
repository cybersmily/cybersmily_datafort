import {
  GangChartEntry,
  GangChart,
  CpGang,
  GangChartData,
} from './../../models';
import { ValueWeight } from './../../../../models/ValueWeight';
import { DiceService } from './../../../../services/dice/dice.service';
import { Observable, of, map } from 'rxjs';
import { GangDataService } from './../gang-data/gang-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GangGeneratorService {
  private _gangCharts: GangChart;

  constructor(
    private gangChartService: GangDataService,
    private dice: DiceService
  ) {}

  generateGang(count?: number): Observable<Array<CpGang>> {
    const numOfGangs = count ?? 1;
    if (this._gangCharts) {
      return of(this.createGangs(numOfGangs, this._gangCharts));
    }
    return this.gangChartService.GangDataCharts.pipe(
      map((charts) => {
        this.fillCharts(charts);
        return this.createGangs(numOfGangs, this._gangCharts);
      })
    );
  }

  private createGangs(count: number, charts: GangChart): Array<CpGang> {
    const gangs = new Array<CpGang>();
    for (let i = 0; i < count; i++) {
      gangs.push(this.rollGang(charts));
    }
    return gangs;
  }

  private fillCharts(data: GangChartData): void {
    this._gangCharts = new GangChart();
    this._gangCharts.type = this.fillChart(data.type);
    this._gangCharts.age = this.fillChart(data.age);
    this._gangCharts.memberAge = this.fillChart(data.memberAge);
    this._gangCharts.member = this.fillChart(data.member);
    this._gangCharts.turf = this.fillChart(data.turf);
    this._gangCharts.expansion = this.fillChart(data.expansion);
    this._gangCharts.naming = {
      adjectives: [...data.naming.adjectives],
      objects: [...data.naming.objects],
      units: [...data.naming.units],
    };
  }

  private fillChart(list: Array<ValueWeight<string>>): Array<GangChartEntry> {
    const result = new Array<GangChartEntry>();
    list.forEach((item) => {
      for (let i = 0; i < item.wt; i++) {
        const entry: GangChartEntry = new GangChartEntry();
        entry.value = item.value;
        entry.mod = item?.mod;
        result.push(entry);
      }
    });
    return result;
  }

  private rollGang(charts: GangChart): CpGang {
    const gang = new CpGang();
    gang.name = this.generateName(charts);
    // roll for type
    let entry = this.generateEntry(charts.type);
    gang.type = entry.value;
    // roll for age, which modifies member rolls
    entry = this.generateEntry(charts.age);
    const memberMod = entry?.mod.value;
    gang.age = entry.value;
    // roll for member's age
    entry = this.generateEntry(charts.memberAge);
    gang.memberAge = entry.value;
    // roll for member, which modifies turf
    entry = this.generateEntry(charts.member, memberMod);
    gang.member = entry.value;
    const turfMod = entry.mod?.value;
    // roll for turf, which modifies expansion
    entry = this.generateEntry(charts.turf, turfMod);
    gang.turf = entry.value;
    const expansionMod = entry.mod?.value;
    // roll for expansion
    entry = this.generateEntry(charts.expansion, expansionMod);
    gang.expansion = entry.value;
    return gang;
  }

  private generateEntry(
    chart: Array<GangChartEntry>,
    modifier?: number
  ): GangChartEntry {
    if (modifier === null) {
      let dieRoll = this.dice.generateNumber(0, chart.length + modifier);
      dieRoll =
        dieRoll < 0 ? 0 : dieRoll > chart.length - 1 ? chart.length : dieRoll;
      return chart[dieRoll];
    }
    return this.dice.rollRandomItem<GangChartEntry>(chart);
  }

  private generateName(charts: GangChart): string {
    const unit = this.dice.rollRandomItem<string>(charts.naming?.units);
    const adjective = this.dice.rollRandomItem<string>(
      charts.naming?.adjectives
    );
    const object = this.dice.rollRandomItem<string>(charts.naming?.objects);
    let name = '';
    const dieRoll = this.dice.generateNumber(1, 10);
    console.log(dieRoll);
    switch (dieRoll) {
      case 1:
        name = `${adjective} ${object} ${unit}`;
        break;
      case 2:
        name = `${unit} of ${adjective} ${object}`;
        break;
      case 3:
        name = `the ${adjective} ${object}`;
        break;
      case 4:
        name = `the ${adjective} ${object} ${unit}`;
        break;
      case 5:
        name = `${object} of ${adjective}`;
        break;
      default:
        name = `${adjective} ${object}`;
    }

    return name;
  }
}
