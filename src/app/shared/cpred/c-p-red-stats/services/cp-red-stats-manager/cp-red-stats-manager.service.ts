import { CpRedWoundsManagerService } from './../../../cp-red-wounds/services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { CpRedStats } from './../../models/cp-red-stats';
import { CalculateCpRedStatModified } from './../../functions/calculate-cp-red-stat-modified';
import { CpRedStatMod } from './../../models/cp-red-stat-mod';
import { CpRedCharacterStats, CpRedCharacterStat } from './../../models';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpRedStatsManagerService {
  private _redStats: BehaviorSubject<CpRedCharacterStats> =
    new BehaviorSubject<CpRedCharacterStats>(new CpRedCharacterStats());
  characterStats: Observable<CpRedCharacterStats> =
    this._redStats.asObservable();

  constructor(private woundManager: CpRedWoundsManagerService) {}

  getStat(name: string): Observable<CpRedCharacterStat> {
    return this.characterStats.pipe(map((stats) => stats[name]));
  }

  getTotalStatPoints(): Observable<number> {
    return this.characterStats.pipe(
      map((stats) => {
        return (
          stats.body.base +
          stats.cool.base +
          stats.dex.base +
          stats.emp.base +
          stats.int.base +
          stats.luck.base +
          stats.move.base +
          stats.ref.base +
          stats.tech.base +
          stats.will.base
        );
      })
    );
  }

  initialize(stats: CpRedStats): void {
    this._redStats.next(new CpRedCharacterStats(stats));
    this.woundManager.setWoundProperties(stats.body.base, stats.will.base);
  }

  updateStatBase(statName: string, value: number): void {
    const stats = this._redStats.getValue();
    stats[statName].base = value;
    stats[statName].modified = CalculateCpRedStatModified(stats[statName]);
    if (statName === 'body' || statName === 'will') {
      this.woundManager.setWoundProperties(stats.body.base, stats.will.base);
    }
    this._redStats.next(stats);
  }

  addStatModifier(statName: string, modifier: CpRedStatMod): void {
    const stats = this._redStats.getValue();
    if (stats[statName]?.modifiers == null) {
      stats[statName].modifiers = new Array<CpRedStatMod>();
    }
    stats[statName]?.modifiers.push(modifier);
    stats[statName].modified = CalculateCpRedStatModified(stats[statName]);
    this._redStats.next(stats);
  }

  deleteStatModifier(statName: string, index: number): void {
    const stats = this._redStats.getValue();
    stats[statName].modifiers.splice(index, 1);
    stats[statName].modified = CalculateCpRedStatModified(stats[statName]);
    this._redStats.next(stats);
  }

  toggleStatModifierActive(statName: string, index: number): void {
    const stats = this._redStats.getValue();
    stats[statName].modifiers[index].active =
      !stats[statName].modifiers[index]?.active;
    stats[statName].modified = CalculateCpRedStatModified(stats[statName]);
    this._redStats.next(stats);
  }

  clear(): void {
    this._redStats.next(new CpRedCharacterStats());
  }
}
