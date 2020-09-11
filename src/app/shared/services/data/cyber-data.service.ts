import { JsonDataFiles } from './../../json-data-files';
import { SaveFileService } from './../save-file.service';
import { DataCyberware, Cp2020PlayerCyber } from './../../models/cyberware';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CyberDataService {

  private _cyberwareList: Array<DataCyberware>;

  constructor(private dataService: DataService, private fileService: SaveFileService) { }

  get CyberwareList(): Observable<Array<DataCyberware>> {
    if (this._cyberwareList) {
      return of(this._cyberwareList);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_CYBERWARE_DATA_LIST_JSON)
    .pipe(
      map( (data: Array<DataCyberware>) => {
        this._cyberwareList = data;
        return this._cyberwareList;
      }),
      map (results => {
        return results.sort( (a, b) => {
        if (a.type === b.type) {
          if (a.subtype === b.subtype) {
            return (a.name > b.name) ? 1 : -1;
          }
          return (a.subtype > b.subtype) ? 1 : -1;
        }
        return (a.type > b.type) ? 1 : -1;
      });
    })
    );
  }

  getCyberwareOptions(type: string): Observable<Array<DataCyberware>> {
    if (this._cyberwareList) {
      return of(this.getfilterOptions(type));
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_CYBERWARE_DATA_LIST_JSON)
    .pipe(
      map( (data: Array<DataCyberware>) => {
        this._cyberwareList = data;
        return this.getfilterOptions(type);
      }),
      map (results => {
        return results.sort( (a, b) => {
        if (a.type === b.type) {
          if (a.subtype === b.subtype) {
            return (a.name > b.name) ? 1 : -1;
          }
          return (a.subtype > b.subtype) ? 1 : -1;
        }
        return (a.type > b.type) ? 1 : -1;
      });
    })
    );
  }

  getCP2020CyberwareOptions(type: string): Observable<Array<Cp2020PlayerCyber>> {
    if (this._cyberwareList) {
      return of(this.getfilterOptions(type).map( cyber => new Cp2020PlayerCyber(cyber)));
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_CYBERWARE_DATA_LIST_JSON)
    .pipe(
      map( (data: Array<DataCyberware>) => {
        this._cyberwareList = data;
        return this.getfilterOptions(type)
        .map(cyber => new Cp2020PlayerCyber(cyber));
      }),
      map (results => {
        return results.sort( (a, b) => {
        if (a.type === b.type) {
          if (a.subtype === b.subtype) {
            return (a.name > b.name) ? 1 : -1;
          }
          return (a.subtype > b.subtype) ? 1 : -1;
        }
        return (a.type > b.type) ? 1 : -1;
      });
    })
    );
  }

  private getfilterOptions(type: string): Array<DataCyberware> {
    return this._cyberwareList
    .filter( cyber =>
      cyber.type.toLowerCase() === type.toLowerCase()
      && (cyber.subtype.toLowerCase() === 'option'
        || cyber.subtype.toLowerCase() === 'builtin'
      )
    );
  }

  save() {
    this.fileService.SaveAsFile('cyberware', JSON.stringify(this._cyberwareList), 'json');
  }

  update(list: Array<DataCyberware>) {
    this._cyberwareList = list;
  }

  add(cyberware: DataCyberware) {
    const cyber = new DataCyberware(cyberware);
    this._cyberwareList.push(cyber);
  }

  delete(name: string, type: string, subtype: string) {
    const i = this._cyberwareList.findIndex( c => {
      return (c.name === name && c.type === type && c.subtype === subtype);
    });
    this._cyberwareList.splice(i, 1 );

  }
}
