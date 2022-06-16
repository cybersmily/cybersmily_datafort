import { ClubberCharts } from './../../models/clubber-charts';
import { ClubCharts } from './../../models/club-charts';
import { map, catchError } from 'rxjs/operators';
import { JsonDataFiles } from '../../../../services/file-services/json-data-files';
import { Observable, of } from 'rxjs';
import { DataService } from '../../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';
import { ClubChartData } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ClubChartDataService {
  private _clubDataChart: ClubChartData;
  private _clubCharts: ClubCharts;
  private _clubberCharts: ClubberCharts;

  constructor(private dataService: DataService) {}

  clubCharts(): Observable<ClubCharts> {
    if (this._clubCharts) {
      return of(this._clubCharts);
    } else {
      return this._getData().pipe(
        map((data) => {
          this._clubCharts = this._generateClubCharts(data);
          return this._clubCharts;
        })
      );
    }
  }

  clubberCharts(): ClubberCharts {
    if (this._clubberCharts) {
      return of(this._clubberCharts);
    } else {
      return this._getData().pipe(
        map((data) => {
          this._clubberCharts = {};
          return this._clubberCharts;
        })
      );
    }
  }

  private _getData(): Observable<ClubChartData> {
    if (this._clubDataChart) {
      return of(this._clubDataChart);
    }
    return this.dataService
      .GetJson<ClubChartData>(JsonDataFiles.CLUB_DATA_CHARTS)
      .pipe(
        map((data) => {
          this._clubDataChart = data;
          return data;
        }),
        catchError((err) => {
          console.error(err);
          return of(null);
        })
      );
  }

  private _generateClubCharts(data: ClubChartData): ClubCharts {
    const chart = {};
    Object.keys(data.clubsCharts).forEach((key) => {
      chart[key] = new Array<string>();
      data.clubsCharts[key].forEach((entry) => {
        for (let i = 0; i < entry.wt; i++) {
          chart[key].push(entry.value);
        }
      });
    });
    return chart as ClubCharts;
  }
}
