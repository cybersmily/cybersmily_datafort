import { JsonDataFiles } from './../file-services';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../file-services';
import { Cp2020Role } from './../../models/cp2020character/cp2020-role';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020RolesDataService {
  private _roles: Cp2020Role[];

  constructor( private dataService: DataService) {
    this._roles = new Array<Cp2020Role>();
  }

  getRoles(): Observable<Array<Cp2020Role>> {
    if (this._roles && this._roles.length > 0) {
      return of(this._roles);
    }
    return this.dataService
      .GetJson( JsonDataFiles.CP2020_ROLES_LIST_JSON)
      .pipe( map( data => {
        this._roles = data.roles;
        this._roles = this._roles.sort( (a, b) => {
          const first = a.base + a.name;
          const second = b.base + b.name;
          // Price is only important when cities are the same
          return first > second ? 1 : -1;
        });
        this._roles.forEach( r => {
          r.name = r.name.replace('\\', '');
        });
        return this._roles;
      }));
  }


}
