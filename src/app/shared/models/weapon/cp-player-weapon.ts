import { DiceService } from './../../services/dice/dice.service';
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
  ammo: string;
  shots: number;
  rof: number;
  rel: string;
  jammed: boolean;
  cost: number;
  notes: string;
  range: number;
  source?: SourceBook;
  count?: number;
  thrown?: boolean;
  _currentShots: Array<boolean>;

  private selectShot = -1;

  constructor(param?) {
    // weapon prop is deprecated. There for backward support
    this.name =
      param && param.weapon
        ? param.weapon
        : param && param.name
          ? param.name
          : '';
    this.type = param ? param.type : '';
    // WA need to see if there is a + in it
    if (param && param.wa && typeof param.wa === 'string') {
      this.wa =
        param && !isNaN(Number(String(param.wa).replace('+', '')))
          ? Number(String(param.wa).replace('+', ''))
          : 0;
    } else {
      this.wa = param ? param.wa : undefined;
    }
    this.conc = param && param.conc ? param.conc.toUpperCase() : 'N';
    this.avail = param && param.avail ? param.avail.toUpperCase() : 'C';
    this.damage = param ? param.damage : '';
    this.ammo = param ? param.ammo : '';
    // shots could be a string for backward capability.
    if (param && param.shots && typeof param.shots === 'string') {
      this.shots =
        param && !isNaN(Number(String(param.shots).replace('+', '')))
          ? Number(String(param.shots).replace('+', ''))
          : 0;
    } else if (param && param.shots && typeof param.shots === 'number') {
      this.shots = param.shots;
    } else {
      this.shots = param && param.shots ? 0 : undefined;
    }
    // RoF could be a string for backward capability.
    if (param && param.rof && typeof param.rof === 'string') {
      this.wa =
        param && !isNaN(Number(String(param.rof).replace('+', '')))
          ? Number(String(param.rof).replace('+', ''))
          : 0;
    } else if (param && param.rof && typeof param.rof === 'number') {
      this.rof = param.rof;
    } else {
      this.rof = param && param.rof ? 0 : undefined;
    }
    this.cost = param ? param.cost : 0;
    this.range = param && param.range ? param.range : this.getDefaultRange();
    this.rel = param && param.rel ? param.rel.toUpperCase() : '';
    this.jammed =
      param && param.jammed !== undefined ? param.jammed : false;
    this.notes = param ? param.notes : '';
    this.source = param ? param.source : undefined;
    this.count = param ? param.count : 0;
    this.thrown = param ? param.thrown : undefined;
  }

  get currentShots(): Array<boolean> {
    if (!this._currentShots) {
      this._currentShots = new Array<boolean>(this.shots).fill(false);
    }
    return this._currentShots;
  }

  private getDefaultRange(): number {
    if (this.type) {
      switch (this.type.toLowerCase()) {
        case 'smg':
          return 150;
        case 'p':
        case 'shg':
        case 'sht':
          return 50;
        case 'rif':
          return 400;
        case 'mel':
          return 1;
        default:
          return 0;
      }
    }
    return 0;
  }

  get shotsUsed(): number {
    if (this.currentShots) {
      return this.currentShots.filter((s) => s).length;
    }
    return 0;
  }

  get isEmpty(): boolean {
    if (this.currentShots) {
      return !this.currentShots.some((s) => !s);
    }
    return false;
  }

  reload() {
    if (this.currentShots) {
      this.selectShot = -1;
      this.currentShots.fill(false);
    }
  }

  expendShot(index: number) {
    if (this.currentShots) {
      if (index === this.selectShot) {
        this.currentShots[index] = !this.currentShots[index];
      } else {
        this.currentShots.fill(true, 0, index + 1);
        this.currentShots.fill(false, index + 1);
      }
      this.selectShot = this.currentShots[index] ? index : index - 1;
    }
  }

  fire(
    diceService: DiceService,
    stat: number = 0,
    skillValue: number = 0,
    shots?: number
  ): string {
    const roll = diceService.rollCP2020D10();
    if (this.currentShots) {
      const usedShots = shots ? shots : 1;
      const index = this.currentShots.lastIndexOf(true) + 1;
      this.currentShots.fill(true, index, index + usedShots);
    }
    const result = this.toHitCalulation(stat, skillValue);
    return `${roll.show(true)} = ${roll.total + result.total}`;
  }

  rollDamage(
    diceService: DiceService,
    numberOfShots: number = 1,
    bodyDamageModifier?: number,
    martialBonus?: number
  ): Array<string> {
    const results = new Array<string>();
    if (diceService && this.damage !== '') {
      for (let i = 0; i < numberOfShots; i++) {
        const roll = diceService.rollMoreDice(this.damage);
        const location = this.rollLocation(diceService);
        let total = roll.total;
        let msg = roll.show();
        if (this.type.toLowerCase() === 'mel') {
          const bodMod = (bodyDamageModifier > -1) ? '+ ' : '';
          total += bodyDamageModifier;
          msg += ` ${bodMod + bodyDamageModifier}(BOD Mod)`;
        }
        if (martialBonus) {
          total += martialBonus;
          msg += ` + ${martialBonus}(MA Mod)`;
        }
        results.push( msg + `= ${total} to ${location}`);
      }
    }
    return results;
  }

  rollLocation(diceService: DiceService): string {
    if (diceService) {
      switch (diceService.generateNumber(1, 10)) {
        case 1:
          return 'Head';
        case 2:
        case 3:
        case 4:
          return 'Torso';
        case 5:
          return 'Right Arm';
        case 6:
          return 'Left Arm';
        case 7:
        case 8:
          return 'Right Leg';
        case 9:
        case 10:
          return 'Left Leg';
        default:
          return '';
      }
    }
   }

  checkReliability(diceService: DiceService): string {
    const roll = diceService.generateNumber(1, 10);
    switch (this.rel.toUpperCase()) {
      case 'VR':
        this.jammed = roll < 4;
        break;
      case 'ST':
        this.jammed = roll < 6;
        break;
      case 'UR':
        this.jammed = roll < 9;
        break;
      default:
    }
    if (!this.jammed) {
      return 'Weapon did not jam.';
    }
    const turns = diceService.generateNumber(1, 6);
    return `Weapon jammed for ${turns} turns.`;
  }

  getRangeBracket(range: number): CombatRange {
    const wr = new WeaponRanges(this.range, this.type);
    return wr.rangeBracket(range);
  }

  toHitCalulation(
    stat: number,
    skill: number
  ): { total: number; results: string } {
    const total = stat + skill + this.wa;
    const results = `${stat}(stat) + ${skill}(skill) + ${this.wa}(wa) = ${total}`;
    return { total: total, results: results };
  }

  showStats(): string {
    const ammoDmg =
      this.ammo && this.ammo !== ''
        ? `${this.ammo}(${this.damage || '-'})`
        : (this.damage  || '-');
    return `${this.type} ${this.wa || '-'} ${this.conc || '-'} ${
      this.avail || '-'
    } ${ammoDmg} ${this.shots || '-'} ${this.rof || '-'} ${this.rel || '-'}`;
  }
}
