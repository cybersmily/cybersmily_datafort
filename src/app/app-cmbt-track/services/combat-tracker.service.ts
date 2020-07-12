import { JsonDataFiles } from './../../shared/json-data-files';
import { DataService } from './../../shared/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CombatTrackerService {

  _modifiers = new BehaviorSubject<any>({});
  modifiers = this._modifiers.asObservable();

  constructor(private dataService: DataService) {
    this.dataService
    .GetJson(JsonDataFiles.CP2020_CMBTTRCK_MODIFIERS_JSON)
    .subscribe( data => {
      this._modifiers.next(data);
    });
  }
}
