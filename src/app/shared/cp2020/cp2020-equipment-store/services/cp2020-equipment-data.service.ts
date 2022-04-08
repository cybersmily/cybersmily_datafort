import { LocalStorageManagerService } from './../../../services/local-storage-manager/local-storage-manager.service';
import { JsonDataFiles } from './../../../services/file-services/json-data-files';
import { Observable, of } from 'rxjs';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';
import { Cp2020Equipment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class Cp2020EquipmentDataService {
  private cp2020EquipKey = 'cp2020-gear';

  constructor(
    private dataService: DataService,
    private localStorage: LocalStorageManagerService
  ) {}

  /**
   * load()
   * Loads the Cyberpunk 2020 equipment list. It will load from local
   * storage first then load from json file.
   *
   * @return {*}  {Observable<Array<Cp2020Equipment>>}
   * @memberof Cp2020EquipmentDataService
   */
  load(): Observable<Array<Cp2020Equipment>> {
    if (this.localStorage.hasKey(this.cp2020EquipKey)) {
      return of(
        this.localStorage.retrive<Array<Cp2020Equipment>>(this.cp2020EquipKey)
      );
    }
    return this.dataService.GetJson(
      JsonDataFiles.CP2020_EQUIPMENT_DATA_LIST_JSON
    );
  }

  /**
   * save()
   * Saves the Cyberpunk equipment list to local storage.
   *
   * @param {Array<Cp2020Equipment>} list
   * @memberof Cp2020EquipmentDataService
   */
  save(list: Array<Cp2020Equipment>): void {
    this.localStorage.store<Array<Cp2020Equipment>>(this.cp2020EquipKey, list);
  }

  /**
   * clear()
   * Clears the localStorage of the CP2020Equipment key.
   *
   * @memberof Cp2020EquipmentDataService
   */
  clear(): void {
    this.localStorage.clear(this.cp2020EquipKey);
  }
}
