import { DiceService } from './../../../services/dice/dice.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService, JsonDataFiles } from './../../../services/file-services';
import { Cp2020Role } from './../models/cp2020-role';
import { Injectable } from '@angular/core';
import { Cp2020PlayerRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class Cp2020RolesDataService {
  private _roles: Cp2020Role[];
  private _iu: boolean = false;

  constructor( private dataService: DataService) {
    this._roles = new Array<Cp2020Role>();
  }

  getRoles(isIU?: boolean): Observable<Array<Cp2020Role>> {
    if (this._roles && this._roles.length > 0 && this._iu === isIU) {
      return of(this._roles);
    }
    this._iu = isIU;
    const fileName = (isIU) ? JsonDataFiles.IU_ROLES_LIST_JSON : JsonDataFiles.CP2020_ROLES_LIST_JSON;
    return this.dataService
      .GetJson( fileName)
      .pipe( map( data => {
        this._roles = data.roles;
        this._roles = this._roles.sort( (a, b) => {
          const first = (a.base || '') + a.name ;
          const second = (b.base || '') + b.name;
          // Price is only important when cities are the same
          return first > second ? 1 : -1;
        });
        this._roles.forEach( r => {
          r.name = r.name.replace('\\', '');
          r.skills = r.skills.map( sk => {
            if(Array.isArray(sk)) {
              return sk.map( s => s.replace("\\&", "&"));
            } else {
              return sk.replace("\\&", "&");
            }
          });
        });
        return this._roles;
      }));
  }


  rollRandomRole(dice: DiceService, isIU?: boolean): Observable<Cp2020PlayerRole> {
    return this.getRoles(isIU).pipe( map(roles => {
      return this.rollRole(roles, dice);
    }));
  }

  private rollRole(roles:Array<Cp2020Role>, dice: DiceService) : Cp2020PlayerRole {
    const die = dice.generateNumber(0, roles.length - 1);
    return new Cp2020PlayerRole(roles[die] );
  }
}
