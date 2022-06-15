import { ClubNameCharts } from './../../models/club-name-charts';
import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../../../../services/file-services/json-data-files';
import { Observable, of } from 'rxjs';
import { DiceService } from './../../../../services/dice/dice.service';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClubNameGeneratorService {
  private _namesCharts: {
    venue: Array<string>;
    adjectives: Array<string>;
    names: Array<string>;
  };

  constructor(private dataService: DataService, private dice: DiceService) {}

  generateNames(count: number): Observable<Array<string>> {
    if (this._namesCharts) {
      return of(this._generateNameArray(count));
    }
    this._namesCharts = {
      venue: new Array<string>(),
      adjectives: new Array<string>(),
      names: new Array<string>(),
    };
    return this.dataService
      .GetJson<ClubNameCharts>(JsonDataFiles.CLUB_NAME_CHARTS)
      .pipe(
        map((data) => {
          Object.keys(data).forEach((key) => {
            data[key].forEach((entry) => {
              for (let i = 0; i < entry.wt; i++) {
                this._namesCharts[key]?.push(entry.value);
              }
            });
          });
          return this._generateNameArray(count);
        })
      );
  }

  private _generateNameArray(count: number): Array<string> {
    const clubNames = new Array<string>();
    for (let i = 0; i < count; i++) {
      clubNames.push(this._generateName());
    }
    return clubNames;
  }

  private _generateName(): string {
    let prefix = '';
    // 20% it will have a prefix
    // 20% it will be 'The ...'
    let percentRoll = this.dice.generateNumber(1, 10);
    if (percentRoll < 3) {
      prefix = this.dice.rollRandomItem(this._namesCharts.venue) + ' ';
    } else if (percentRoll < 5) {
      prefix = 'The ';
    }

    // 50/50 it will have an adjective
    percentRoll = this.dice.generateNumber(1, 10);
    const adjective =
      percentRoll < 7
        ? ''
        : this.dice.rollRandomItem(this._namesCharts.adjectives) + ' ';
    const name = this.dice.rollRandomItem(this._namesCharts.names);
    // if there is a prefix is blank or The, then it will have a suffix
    percentRoll = this.dice.generateNumber(1, 10);
    const suffix =
      prefix === '' && percentRoll < 5
        ? ' ' + this.dice.rollRandomItem(this._namesCharts.venue)
        : '';
    return `${prefix}${adjective}${name}${suffix}`;
  }
}
