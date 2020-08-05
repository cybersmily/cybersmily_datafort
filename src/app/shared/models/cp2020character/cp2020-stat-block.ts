import { Cp2020_WOUND_LEVELS } from './cp2020-wound-levels.enum';
import { Cp2020Stats} from './cp2020-stats';
import { Cp2020Stat} from './cp2020-stat';

export class Cp2020StatBlock implements Cp2020Stats {
  private _basePoints: number; // used to total points for when PC was created.
  INT: Cp2020Stat;
  REF: Cp2020Stat;
  TECH: Cp2020Stat;
  COOL: Cp2020Stat;
  ATTR: Cp2020Stat;
  LUCK: Cp2020Stat;
  MA: Cp2020Stat;
  BODY: Cp2020Stat;
  EMP: Cp2020Stat;
  StunSaveMod: number;
  DeathSaveMod: number;
  private _humanityCost: number;
  WoundLevel: Cp2020_WOUND_LEVELS;
  private _damage: number;
  isStunned: boolean;
  deathState: number;

  constructor() {
    this._basePoints = 0;
    this.INT = new Cp2020Stat();
    this.REF = new Cp2020Stat();
    this.TECH = new Cp2020Stat();
    this.COOL = new Cp2020Stat();
    this.ATTR = new Cp2020Stat();
    this.LUCK = new Cp2020Stat();
    this.MA = new Cp2020Stat();
    this.BODY = new Cp2020Stat();
    this.EMP = new Cp2020Stat();
    this._humanityCost = 0;
    this.WoundLevel = Cp2020_WOUND_LEVELS.NONE;
    this.DeathSaveMod = 0;
    this.StunSaveMod = 0;
    this.isStunned = false;
    this.deathState = 0;
  }

  import( value: any ) {
    this._basePoints = (value._basePoints) ? value._basePoints : 0;
    this.INT = this.importStat(value.INT);
    this.REF = this.importStat(value.REF);
    this.TECH = this.importStat(value.TECH);
    this.COOL = this.importStat(value.COOL);
    this.ATTR = this.importStat(value.ATTR);
    this.LUCK = this.importStat(value.LUCK);
    this.MA = this.importStat(value.MA);
    this.BODY = this.importStat(value.BODY);
    this.EMP = this.importStat(value.EMP);
    this._humanityCost =  (value._humanityCost) ? value._humanityCost : 0;
    this.EMP.Modifier = -(Math.floor(this._humanityCost / 10));
    this.Damage = (value._damage) ? value._damage : 0;
    this.isStunned = (value.isStunned !== undefined) ? value.isStunned : false;
    this.StunSaveMod = (value.StunSaveMod) ? value.StunSaveMod : 0;
    this.DeathSaveMod = (value.DeathSaveMod) ? value.DeathSaveMod : 0;
    this.deathState = (value.deathState) ? value.deathState : 0;
  }

  private importStat(value): Cp2020Stat {
    const stat = new Cp2020Stat();
    stat.Base = (value && value._value) ? value._value : 0;
    stat.Modifier = (value && value.Modifier) ? value.Modifier : 0;
    stat.Multiplier  = (value && value._multiplier) ? value._multiplier : 1;
    stat.WoundModifier  = (value && value._woundMod) ? value._woundMod : 0;
    return stat;
  }

  get BasePoints(): number {
    return this._basePoints;
  }

  set BasePoints(value: number) {
    this._basePoints = value;
  }

  get CurrentPoints(): number {
    let points = this.BasePoints;
    points -= this.INT.Base;
    points -= this.REF.Base;
    points -= this.TECH.Base;
    points -= this.COOL.Base;
    points -= this.ATTR.Base;
    points -= this.LUCK.Base;
    points -= this.MA.Base;
    points -= this.BODY.Base;
    points -= this.EMP.Base;
    return points;
  }

  get Humanity(): number {
    return (this.EMP.Base * 10);
  }

  get CurrentHumanity(): number {
    return (this.Humanity - this.HumanityCost);
  }

  get HumanityCost(): number {
    return this._humanityCost;
  }

  set HumanityCost(value: number) {
    this.EMP.Modifier = -(Math.floor(value / 10));
    this._humanityCost = value;
  }

  get Run(): number {
    return (this.MA.Adjusted) * 3;
  }

  get Leap(): number {
    return (this.Run / 4);
  }

  get Lift(): number {
    return this.BODY.Adjusted * 40;
  }

  get Save(): number {
    const save = this.BODY.Adjusted - this.StunSaveMod;
    return ( (save < 0) ? 0 : save );
  }

  get DeathSave(): number {
    const save = this.BODY.Adjusted - this.DeathSaveMod;
    return ( (save < 0) ? 0 : save );
  }

  get BTM(): number {
    switch ( this.BODY.Adjusted) {
      case 0:
      case 1:
      case 2:
        return 0;
      case 3:
      case 4:
        return -1;
      case 5:
      case 6:
      case 7:
        return -2;
      case 8:
      case 9:
        return -3;
      case 10:
        return -4;
      default:
        // superhuman strength
        return -5;
    }
  }

  get BodyDmgMod(): number {
    if (this.BODY.Adjusted < 3) {
      return -2;
    } else if (this.BODY.Adjusted > 3 && this.BODY.Adjusted < 5) {
      return -1;
    } else if (this.BODY.Adjusted > 4 && this.BODY.Adjusted < 8) {
      return 0;
    } else if (this.BODY.Adjusted > 7 && this.BODY.Adjusted < 10) {
      return 1;
    } else if (this.BODY.Adjusted === 10) {
      return 2;
    } else if (this.BODY.Adjusted === 11 || this.BODY.Adjusted === 12) {
      return 4;
    } else if (this.BODY.Adjusted === 13 || this.BODY.Adjusted === 14) {
      return 6;
    } else if (this.BODY.Adjusted > 14) {
      return 8;
    } else {
      return 0;
    }
  }

  get BodyType(): string {
    switch ( this.BODY.Adjusted) {
      case 0:
      case 1:
      case 2:
        return 'Very Weak';
      case 3:
      case 4:
        return 'Weak';
      case 5:
      case 6:
      case 7:
        return 'Average';
      case 8:
      case 9:
        return 'Strong';
      case 10:
        return 'Very Strong';
      default:
        // superhuman strength
        return 'Superhuman';
    }
  }

  get Damage(): number {
    return this._damage;
  }

  set Damage(value: number) {
    this._damage = (value > 40) ? 40 : (value < 0 ) ? 0 : value;
    this.StunSaveMod = Math.floor((this._damage - 1 ) / 4);
    this.StunSaveMod = ( this.StunSaveMod < 0 ) ? 0 : this.StunSaveMod;
    this.DeathSaveMod = Math.floor((this._damage - 13 ) / 4);
    this.DeathSaveMod = ( this.DeathSaveMod < 0 ) ? 0 : this.DeathSaveMod;
    if (this._damage > 4 && this._damage < 9) {
      this.REF.WoundModifier = -2;
      this.REF.Multiplier = 1;
      this.WoundLevel = Cp2020_WOUND_LEVELS.SERIOUS;
    } else if (this._damage > 0 && this._damage < 5) {
      this.REF.WoundModifier = 0;
      this.REF.Multiplier = 1;
      this.INT.Multiplier = 1;
      this.COOL.Multiplier = 1;
      this.WoundLevel = Cp2020_WOUND_LEVELS.LIGHT;
    } else if (this._damage > 8 && this._damage < 13) {
      this.WoundLevel = Cp2020_WOUND_LEVELS.CRITICAL;
      this.REF.WoundModifier = 0;
      this.REF.Multiplier = 0.5;
      this.INT.Multiplier = 0.5;
      this.COOL.Multiplier = 0.5;
    } else if ( this._damage > 12 ) {
      this.REF.WoundModifier = 0;
      this.REF.Multiplier = 0.33;
      this.INT.Multiplier = 0.33;
      this.COOL.Multiplier = 0.33;
      switch (this.DeathSaveMod) {
        case 0:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_0;
          break;
        case 1:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_1;
          break;
        case 2:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_2;
          break;
        case 3:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_3;
          break;
        case 4:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_4;
          break;
        case 5:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_5;
          break;
        case 6:
          this.WoundLevel = Cp2020_WOUND_LEVELS.MORTAL_6;
          break;
      }
    } else {
      this.WoundLevel = Cp2020_WOUND_LEVELS.NONE;
      this.REF.Multiplier = 1;
      this.INT.Multiplier = 1;
      this.COOL.Multiplier = 1;
    }
  }
}
