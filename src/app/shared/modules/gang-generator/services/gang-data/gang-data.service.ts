import { JsonDataFiles } from './../../../../services/file-services/json-data-files';
import { Observable, of, map } from 'rxjs';
import { GangChartData } from './../../models/gang-chart-data';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GangDataService {
  _gangCharts: GangChartData;

  constructor(private DataService: DataService) {}

  get GangDataCharts(): Observable<GangChartData> {
    if (this._gangCharts) {
      return of(this._gangCharts);
    }
    return this.DataService.GetJson<GangChartData>(
      JsonDataFiles.GANG_CHART_DATA_JSON
    ).pipe(
      map((data) => {
        this._gangCharts = data;
        return this._gangCharts;
      })
    );
  }
}
