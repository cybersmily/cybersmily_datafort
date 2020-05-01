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
    .GetJson('/json/apps/cbttrk/modifiers.json')
    .subscribe( data => {
      this._modifiers.next(data);
    });
  }
}
