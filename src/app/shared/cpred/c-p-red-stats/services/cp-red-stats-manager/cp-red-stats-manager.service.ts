import { CpRedCharacterStats } from './../../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpRedStatsManagerService {
  private _redStats: BehaviorSubject<CpRedCharacterStats> =
    new BehaviorSubject<CpRedCharacterStats>(new CpRedCharacterStats());
  characterStats: Observable<CpRedCharacterStats> =
    this._redStats.asObservable();

  constructor() {}

  updateStat();
}
