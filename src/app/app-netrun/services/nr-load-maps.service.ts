import { NRMap } from './../models/nr-map';
import { JsonDataFiles } from './../../shared/services/file-services';
import { Observable } from 'rxjs';
import { DataService } from './../../shared/services/file-services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NrLoadMapsService {

  constructor(private dataService: DataService) { }

  get nrMapData(): Observable<any> {
    return this.dataService.GetJson(JsonDataFiles.CP2020_NETRUN_MAPDATA_JSON);
  }

  getNRMap(map: string): Observable<NRMap> {
    return this.dataService.GetJson(`${JsonDataFiles.CP2020_NETRUN_MAPPATH_JSON}${map}`);
  }
}
