import { CpRedCharacterCriticalInjury } from './../../models/cp-red-character-critical-injury';
import { CpRedCharacterAddiction } from './../../models/cp-red-character-addiction';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CpRedCharacterDeathSave,
  CpRedCharacterWounds,
  CP_RED_WOUND_LEVELS,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CpRedWoundsManagerService {
  private _wounds: BehaviorSubject<CpRedCharacterWounds> = new BehaviorSubject(
    new CpRedCharacterWounds()
  );
  wounds$: Observable<CpRedCharacterWounds> = this._wounds;

  constructor() {}

  initialize(wounds?: CpRedCharacterWounds): void {
    if (wounds) {
      this.updateWounds(wounds);
    }
  }

  setWoundProperties(body: number, will: number): void {
    const wounds = this._wounds.getValue();
    const bodyWill = body + will; // intellisense isn't allow proper addition in formula.
    wounds.hitPoints.base = Math.ceil(bodyWill / 2) * 5 + 10;
    wounds.seriouslyWound = Math.ceil(wounds.hitPoints.base / 2);
    if (wounds.hitPoints.curr < 1 && !wounds.isDead) {
      wounds.hitPoints.curr = wounds.hitPoints.base;
    }
    wounds.deathSave.base = body;
    this.updateWounds(wounds);
  }

  updateWounds(wounds: CpRedCharacterWounds): void {
    wounds.woundLevel = this.setWoundLevel(wounds);
    this._wounds.next(wounds);
  }

  updateCurrentHitPoints(hitPoints: number): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.hitPoints.curr = this.setValueWithBase(
      hitPoints,
      wounds.hitPoints.base
    );
    this.updateWounds(wounds);
  }

  private setValueWithBase(curr: number, base: number): number {
    return curr < 0 ? 0 : curr > base ? base : curr;
  }

  updateCurrentDeathSave(deathSave: number): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.deathSave.curr = deathSave;
    this.updateWounds(wounds);
  }

  addAddiction(addiction: CpRedCharacterAddiction): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.addictions.push({ ...addiction });
    this.updateWounds(wounds);
  }

  updateAddiction(
    addictionName: string,
    addiction: CpRedCharacterAddiction
  ): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.addictions.findIndex(
      (addiction) =>
        addiction.name.toLowerCase() === addictionName.toLowerCase()
    );
    if (index > -1) {
      wounds.addictions[index] = { ...addiction };
      this.updateWounds(wounds);
    }
  }

  removeAddiction(addiction: CpRedCharacterAddiction): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.addictions.findIndex(
      (add) => addiction.name.toLowerCase() === add.name.toLowerCase()
    );
    if (index > -1) {
      wounds.addictions.splice(index, 1);
      this.updateWounds(wounds);
    }
  }

  hasAddiction(addictionName: string): Observable<boolean> {
    if (addictionName === null || addictionName.trim() === '') {
      of(false);
    }
    return of(
      this._wounds
        .getValue()
        ?.addictions?.some(
          (addiction) =>
            addiction.name.toLowerCase() === addictionName.toLowerCase()
        )
    );
  }

  addCriticalInjury(injury: CpRedCharacterCriticalInjury): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.criticalInjuries.push({ ...injury });
    this.updateWounds(wounds);
  }

  updateCriticalInjury(
    injuryName: string,
    injury: CpRedCharacterCriticalInjury
  ): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.criticalInjuries.findIndex(
      (critical) => critical.name === injuryName
    );
    if (index > -1) {
      wounds.criticalInjuries[index] = { ...injury };
      this.updateWounds(wounds);
    }
  }

  hasCriticalInjury(injuryName: string): Observable<boolean> {
    if (injuryName === null || injuryName.trim() === '') {
      of(false);
    }
    return of(
      this._wounds
        .getValue()
        ?.criticalInjuries?.some(
          (inj) => inj.name.toLowerCase() === injuryName.toLowerCase()
        )
    );
  }

  removeCriticalInjury(injury: CpRedCharacterCriticalInjury): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.criticalInjuries.findIndex(
      (critical) => critical.name === injury.name
    );
    if (index > -1) {
      wounds.criticalInjuries.splice(index, 1);
      this.updateWounds(wounds);
    }
  }

  private setWoundLevel(wounds: CpRedCharacterWounds): CP_RED_WOUND_LEVELS {
    if (wounds.hitPoints.curr >= wounds.hitPoints.base) {
      return CP_RED_WOUND_LEVELS.NONE;
    }
    if (wounds.hitPoints.curr < 1) {
      return CP_RED_WOUND_LEVELS.MORTALLY;
    }
    if (wounds.hitPoints.curr < wounds.seriouslyWound) {
      return CP_RED_WOUND_LEVELS.SERIOUSLY;
    }
    return CP_RED_WOUND_LEVELS.LIGHTLY;
  }
}
