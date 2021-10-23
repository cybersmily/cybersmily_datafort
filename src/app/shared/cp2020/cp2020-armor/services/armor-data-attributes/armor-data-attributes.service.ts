import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService, Cp2020AppFiles } from './../../../../services/file-services';
import { Injectable } from '@angular/core';
import { ArmorAttributeLists } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ArmorDataAttributesService {

  private _attributes: ArmorAttributeLists;

  constructor(private dataService: DataService) { }

  getData(): Observable<ArmorAttributeLists> {
    if(this._attributes) {
      return of(this._attributes);
    }
    return this.dataService
      .GetJson(Cp2020AppFiles.ARMOR_ATTRIBUTES)
      .pipe( map( (data: ArmorAttributeLists) => {
        this._attributes = data;
        this._attributes.clothes = this._attributes.clothes.sort((a,b) => a.name.localeCompare(b.name));
        return this._attributes;
      }));
  }
}
