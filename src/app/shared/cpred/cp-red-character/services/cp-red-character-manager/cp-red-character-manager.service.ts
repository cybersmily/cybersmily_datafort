import { CpRedCharacterStats } from './../../../c-p-red-stats/models/cp-red-character-stats';
import { CPRedCharacterSheet, CpRedCharacter } from './../../../models';
import {} from './../../../models/cp-red-character-sheet';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CpRedCharacterManagerService {
  private _sheet: BehaviorSubject<CPRedCharacterSheet> =
    new BehaviorSubject<CPRedCharacterSheet>(new CPRedCharacterSheet());
  sheet: Observable<CPRedCharacterSheet> = this._sheet.asObservable();

  constructor() {}

  updateCharacter(character: CpRedCharacter): void {
    this._sheet.next(new CPRedCharacterSheet(character));
  }

  updateStats(stats: CpRedCharacterStats): void {
    const sheet = this._sheet.getValue();
    sheet.character.stats = new CpRedCharacterStats(stats);
    this._sheet.next(sheet);
  }

  clear(): void {
    this._sheet.next(new CPRedCharacterSheet());
  }
}
