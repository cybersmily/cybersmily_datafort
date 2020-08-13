import { SourceBook } from './../sourcebook';
import { WeaponRanges } from './weapon-ranges';
import { CombatRange } from './combat-range';
import { CpWeapon } from '.';
export class CpPlayerWeapon implements CpWeapon {
  name: string;
  type: string;
  wa: number;
  conc: string;
  avail: string;
  damage: string;
  shots: number;
  shotsUsed: number;
  rof: number;
  rel: string;
  jammed: boolean;
  cost: number;
  notes: string;
  range: number;
  source?: SourceBook;
  count?: number;

  constructor(param?) {
    // weapon prop is deprecated. There for backward support
    this.name = (param && param.weapon) ? param.weapon : (param && param.name) ? param.name : '';
    this.type = (param) ? param.type : '';
    // WA need to see if there is a + in it
    if ( param && param.wa && typeof param.wa === 'string') {
      this.wa = (param && !isNaN(Number(String(param.wa).replace('+', '')))) ? Number(String(param.wa).replace('+', '')) : 0;
    } else {
      this.wa = param ? param.wa : undefined;
    }
    this.conc = (param) ? param.conc : 'N';
    this.avail = (param) ? param.avail : 'C';
    this.damage = (param) ? param.damage : '';
    // shots could be a string for backward capability.
    if ( param && param.shots && typeof param.shots === 'string') {
      this.shots = (param && !isNaN(Number(String(param.shots).replace('+', '')))) ? Number(String(param.shots).replace('+', '')) : 0;
    } else if (param && param.shots && typeof param.shots === 'number') {
      this.shots = param.shots;
    } else {
      this.shots = (param && param.shots) ? 0 : undefined;
    }
    this.shotsUsed = (param && param.shotsUsed && !isNaN(param.shotsUsed)) ? param.shotsUsed : 0;
    // RoF could be a string for backward capability.
    if ( param && param.rof && typeof param.rof === 'string') {
      this.wa = (param && !isNaN(Number(String(param.rof).replace('+', '')))) ? Number(String(param.rof).replace('+', '')) : 0;
    } else if (param && param.rof && typeof param.rof === 'number') {
      this.rof = param.rof;
    } else {
      this.rof = (param && param.rof) ? 0 : undefined;
    }
    this.cost = (param) ? param.cost : 0;
    this.range = (param) ? param.range : 0;
    this.rel = (param) ? param.rel : '';
    this.jammed = (param && param.jammed !== undefined) ? param.jammed : false;
    this.notes = (param) ? param.notes : '';
    this.source = (param) ? param.source : undefined;
    this.count = (param) ? param.count : 0;
  }

  get isEmpty(): boolean {
    return this.shots <= this.shotsUsed || isNaN(this.shotsUsed);
  }

  checkReliability(roll: number) {
    switch (this.rel.toUpperCase()) {
      case 'VR':
        this.jammed = (roll < 4);
        break;
      case 'ST':
        this.jammed = (roll < 6);
        break;
      case 'UR':
        this.jammed = (roll < 9);
        break;
      default:
    }
  }

  getRangeBracket(range: number): CombatRange {
    const wr = new WeaponRanges(this.range, this.type);
    return wr.rangeBracket(range);
  }
}
