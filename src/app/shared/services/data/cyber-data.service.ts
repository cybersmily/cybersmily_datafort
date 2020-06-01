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
    .GetJson('/json/data/cyberware.json')
    .pipe(
      map( (data: Array<DataCyberware>) => {
        this._cyberwareList = data.sort( (a, b) => {
          if (a.type === b.type) {
            if (a.subtype === b.subtype) {
              return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            }
            return a.subtype.toLowerCase() > b.subtype.toLowerCase() ? 1 : -1;
          }
          return a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1;
        });
        return this._cyberwareList;
      })
    );
  }

  save() {
    this.fileService.SaveAsFile('cyberware', JSON.stringify(this._cyberwareList), 'json');
  }

  add(cyberware: DataCyberware) {
    const cyber = new DataCyberware(cyberware);
    this._cyberwareList.push(cyber);
  }

  delete(name: string) {
    const i = this._cyberwareList.findIndex( c => {
      return (c.name === name);
    });
    this._cyberwareList.splice(i, 1 );
  }
}
