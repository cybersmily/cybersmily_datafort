import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService, MasterDataFiles } from '../../../../services/file-services';
import { Injectable } from '@angular/core';
import { Cp2020ArmorPiece } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ArmorDataListService {

  private _armorList: Array<Cp2020ArmorPiece>;

  constructor(private dataService: DataService) { }

  getData(): Observable<Array<Cp2020ArmorPiece>> {
    if (this._armorList) {
      return of(this._armorList);
    }
    return this.dataService.GetJson(MasterDataFiles.CP2020_ARMOR_MASTER_LIST)
    .pipe(
      map( (data: Array<Cp2020ArmorPiece>) => {
        this._armorList = data.sort((a, b) => a.name.localeCompare(b.name));
        return this._armorList;
      })
    );
  }
}
