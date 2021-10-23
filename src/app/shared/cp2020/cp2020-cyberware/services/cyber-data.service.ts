import { SaveFileService, JsonDataFiles } from './../../../services/file-services';
import { DataService } from './../../../services/file-services';
import { DataCyberware, Cp2020PlayerCyber } from './../models';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
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
      map ( (results: Array<DataCyberware>) => {
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

  get cp2020CyberwareList(): Observable<Array<Cp2020PlayerCyber>> {
    return this.CyberwareList
    .pipe(
      map( (data: Array<Cp2020PlayerCyber>) => {
        return data
        .map(cyber => new Cp2020PlayerCyber(cyber));
      })
    );
  }

  getCyberwareOptions(type: string): Observable<Array<DataCyberware>> {
    return this.CyberwareList
    .pipe(
      map( (data: Array<DataCyberware>) => {
        this._cyberwareList = data;
        return this.getfilterOptions(type);
      }),
      map ((results: Array<DataCyberware>) => {
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
    return this.getCyberwareOptions(type)
    .pipe(
      map( (data: Array<DataCyberware>) => {
        return data
        .map(cyber => new Cp2020PlayerCyber(cyber));
      })
    );
  }

  private getfilterOptions(type: string): Array<DataCyberware> {
    if(type) {
    return this._cyberwareList
    .filter( cyber =>
      cyber.type.toLowerCase() === type.toLowerCase()
      && (cyber.subtype.toLowerCase() === 'option'
        || cyber.subtype.toLowerCase() === 'builtin'
      )
    );
    }
    return new Array<DataCyberware>();
  }

  save() {
    this.fileService.SaveAsFile('cyberware', JSON.stringify(this._cyberwareList), 'json');
  }

  update(list: Array<DataCyberware>) {
    this._cyberwareList = list;
  }

  add(cyberware: DataCyberware) {
    const cyber = new DataCyberware(cyberware);
    if(this._cyberwareList) {
      this._cyberwareList.push(cyber);
    } else {
      this.CyberwareList.subscribe(data => {
        this._cyberwareList.push(cyber);
      });
    }
  }

  delete(name: string, type: string, subtype: string) {
    if(this._cyberwareList) {
      const i = this._cyberwareList.findIndex( c => {
        return (c.name === name && c.type === type && c.subtype === subtype);
      });
     this._cyberwareList.splice(i, 1 );
    } else {
      this.CyberwareList.subscribe(data => {
        this.delete(name, type, subtype);
      });

    }

  }
}
