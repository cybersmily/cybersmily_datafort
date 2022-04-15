import { OppCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { JsonDataFiles } from './../../shared/services/file-services';
import { CpPlayerWeapon } from './../../shared/cp2020/cp2020weapons/models';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckEntry, CmbtTrckCharts } from '../../shared/models/cmbt-trck';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../../shared/services/file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CmbtTrckOppChartService {
  private _curCharts: CmbtTrckCharts;

  constructor(private data: DataService, private dice: DiceService) {}

  getData(): Observable<CmbtTrckCharts> {
    return this.data
      .GetJson<CmbtTrckCharts>(JsonDataFiles.CP2020_CMBTTRCK_GEAR_JSON)
      .pipe(
        map((chart) => {
          this._curCharts = chart;
          return this._curCharts;
        })
      );
  }

  generateWeapon(count: number): Observable<Array<CpPlayerWeapon>> {
    if (this._curCharts) {
      return of(this.getWeapon(count));
    }
    return this.getData().pipe(
      map((chart) => {
        return this.getWeapon(count);
      })
    );
  }

  getWeapon(count: number): Array<CpPlayerWeapon> {
    const results = new Array<CpPlayerWeapon>();
    for (let i = 0; i < count; i++) {
      let die = this.dice.generateNumber(
        0,
        this._curCharts.weapon.chart.length - 1
      );
      const value = this._curCharts.weapon.chart[die];
      const options = this._curCharts.weapon.values[value];
      if (options && options.choices) {
        die = this.dice.generateNumber(0, options.choices.length - 1);
        const newWeapon = new CpPlayerWeapon(options.choices[die]);
        results.push(newWeapon);
      }
    }
    return results;
  }

  generateArmor(): Observable<CmbtTrckEntry> {
    if (this._curCharts) {
      return of(this.getArmor());
    }
    return this.getData().pipe(
      map((chart) => {
        return this.getArmor();
      })
    );
  }

  private getArmor(): CmbtTrckEntry {
    const die = this.dice.generateNumber(
      0,
      this._curCharts.armor.chart.length - 1
    );
    const value = this._curCharts.armor.chart[die];
    const result = this._curCharts.armor.values[value];
    return result;
  }

  generateCyberware(count: number): Observable<Array<OppCyberware>> {
    if (this._curCharts) {
      return of(this.getCyberware(count));
    }
    return this.getData().pipe(
      map((chart) => {
        return this.getCyberware(count);
      })
    );
  }

  private getCyberware(count: number): Array<OppCyberware> {
    const results = new Array<OppCyberware>(count);
    for (let i = 0; i < count; i++) {
      let cyber: OppCyberware;
      do {
        cyber = this.rollCyberware();
      } while (!cyber && results.some((c) => c.name === cyber.name));
      if (cyber.name && cyber.name !== '') {
        results[i] = cyber;
      }
    }
    return results;
  }

  private rollCyberware(): OppCyberware {
    // roll on the chart
    let die = this.dice.generateNumber(
      0,
      this._curCharts.cyberware.chart.length - 1
    );
    const value = this._curCharts.cyberware.chart[die];
    // get the value form the table
    const found = this._curCharts.cyberware.values[value];
    const cyber = new OppCyberware();
    if (found) {
      cyber.name = found.name;
      cyber.armor = found.armor;
      // roll for options
      if (found.options && found.optLimit) {
        const lmt = this.dice.generateNumber(0, found.optLimit);
        let i = 0;
        cyber.options = '';
        do {
          die = this.dice.generateNumber(0, found.options.length - 1);
          const opt = found.options[die];
          if (opt && !cyber.options.toLowerCase().includes(opt.toLowerCase())) {
            if (cyber.options && cyber.options !== '' && opt && opt !== '') {
              cyber.options += ', ';
            }
            cyber.options += opt;
          }
          i++;
        } while (i < lmt);
      }
    }
    return cyber;
  }
}
