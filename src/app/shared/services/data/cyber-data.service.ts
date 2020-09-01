import { JsonDataFiles } from './../../json-data-files';
import { SaveFileService } from './../save-file.service';
import { DataCyberware } from './../../models/cyberware';
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
      })
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
