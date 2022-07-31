import { CpRedCharacterCriticalInjury } from './../../models/cp-red-character-critical-injury';
import { CpRedCharacterAddiction } from './../../models/cp-red-character-addiction';
import { BehaviorSubject } from 'rxjs';
import { CpRedStatsManagerService } from './../../../c-p-red-stats/services/cp-red-stats-manager/cp-red-stats-manager.service';
import { Injectable } from '@angular/core';
import { CpRedCharacterWounds, CP_RED_WOUND_LEVELS } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CpRedWoundsManagerService {
  private _wounds: BehaviorSubject<CpRedCharacterWounds> = new BehaviorSubject(
    new CpRedCharacterWounds()
  );
  wounds = this._wounds.asObservable();

  constructor() {}

  initialize(wounds?: CpRedCharacterWounds): void {
    if (wounds) {
      this.updateWounds(wounds);
    }
  }

  setWoundProperties(body: number, will: number): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const bodyWill = body + will; // intellisense isn't allow proper addition in formula.
    wounds.hitPoints.base = Math.ceil(bodyWill / 2) * 5 + 10;
    wounds.seriouslyWound = Math.ceil(wounds.hitPoints.base / 2);
    if (wounds.hitPoints.curr < 1 && !wounds.isDead) {
      wounds.hitPoints.curr = wounds.hitPoints.base;
    }
    wounds.deathSave = body;
    this.updateWounds(wounds);
  }

  updateWounds(wounds: CpRedCharacterWounds): void {
    wounds.woundLevel = this.setWoundLevel(wounds);
    this._wounds.next(new CpRedCharacterWounds(wounds));
  }

  updateCurrentHitPoints(hitPoints: number): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.hitPoints.curr = this.setHitPoints(hitPoints, wounds.hitPoints.base);
    wounds.isDead = wounds.hitPoints.curr < 1;
    this.updateWounds(wounds);
  }

  private setHitPoints(curr: number, base: number): number {
    return curr < 0 ? 0 : curr > base ? base : curr;
  }

  addAddiction(addiction: CpRedCharacterAddiction): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.addictions.push({ ...addiction });
    this.updateWounds(wounds);
  }

  updateAddiction(addiction: CpRedCharacterAddiction): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.addictions.findIndex(
      (addctn) => addiction.name === addctn.name && addiction.dv === addctn.dv
    );
    if (index > -1) {
      wounds.addictions[index] = { ...addiction };
      this.updateWounds(wounds);
    }
  }

  removeAddiction(addiction: CpRedCharacterAddiction): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.addictions.findIndex(
      (addctn) => addiction.name === addctn.name && addiction.dv === addctn.dv
    );
    if (index > -1) {
      wounds.addictions.splice(index, 1);
      this.updateWounds(wounds);
    }
  }

  addCriticalInjury(injury: CpRedCharacterCriticalInjury): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    wounds.criticalInjuries.push({ ...injury });
    this.updateWounds(wounds);
  }

  updateCriticalInjury(injury: CpRedCharacterCriticalInjury): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.criticalInjuries.findIndex(
      (critical) => critical.name === injury.name
    );
    if (index > -1) {
      wounds.criticalInjuries[index] = { ...injury };
      this.updateWounds(wounds);
    }
  }

  removeCriticalInjury(injury: CpRedCharacterCriticalInjury): void {
    const wounds = new CpRedCharacterWounds(this._wounds.getValue());
    const index = wounds.criticalInjuries.findIndex(
      (critical) => critical.name === injury.name
    );
    if (index > -1) {
      wounds.addictions.splice(index, 1);
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
