import { Cp2020_WOUND_LEVELS } from './cp2020-wound-levels.enum';
import { Cp2020Stats } from './cp2020-stats';
import { Cp2020Stat, StatModifier } from './cp2020-stat';

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
  initiativeModifiers: Array<StatModifier>;
  private _isIU: boolean;
  ignoreWounds: boolean;
  ignoreSaves:boolean;

  constructor(isIU?: boolean) {
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
    this.ignoreWounds = false;
    this.ignoreSaves = false;
    this.deathState = 0;
    this.initiativeModifiers = new Array<StatModifier>();
    this._isIU = isIU;
  }

  import(value: any) {
    this._basePoints = value?._basePoints ?? 0;
    this.INT = this.importStat(value.INT);
    this.REF = this.importStat(value.REF);
    this.TECH = this.importStat(value.TECH);
    this.COOL = this.importStat(value.COOL);
    this.ATTR = this.importStat(value.ATTR);
    this.LUCK = this.importStat(value.LUCK);
    this.MA = this.importStat(value.MA);
    this.BODY = this.importStat(value.BODY);
    this.EMP = this.importStat(value.EMP);
    this._humanityCost = value?._humanityCost ?? 0;
    this.setHCCost();
    this.Damage = value?._damage ?? 0;
    this.isStunned = value?.isStunned ?? false;
    this.StunSaveMod = value?.StunSaveMod ?? 0;
    this.DeathSaveMod = value?.DeathSaveMod ?? 0;
    this.deathState = value?.deathState ?? 0;
    this.ignoreWounds = value?.ignoreWounds ?? false;
    this.ignoreSaves = value?.ignoreSaves ?? false;
    this.initiativeModifiers = value?.initiativeModifiers ?? new Array<StatModifier>();
  }

  private importStat(value): Cp2020Stat {
    const stat = new Cp2020Stat();
    stat.Base = value?._value ?? 0;
    stat.modifiers = value?.modifiers ?? new Array<StatModifier>();
    stat.Multiplier = value?._multiplier ?? 1;
    stat.WoundModifier = value?._woundMod ?? 0;
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
    this._humanityCost = value;
    this.setHCCost();
  }

  get totalInitModifiers(): number {
    return this.initiativeModifiers.reduce((a, b) => a + b.mod, 0);
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
    const save = ((this._isIU) ? this.COOL.Adjusted : this.BODY.Adjusted) - this.StunSaveMod;
    return ((save < 0) ? 0 : save);
  }

  get DeathSave(): number {
    const save = this.BODY.Adjusted - this.DeathSaveMod;
    return ((save < 0) ? 0 : save);
  }

  get BTM(): number {
    switch (this.BODY.Adjusted) {
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
    } else if (this.BODY.Adjusted > 2 && this.BODY.Adjusted < 5) {
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
    switch (this.BODY.Adjusted) {
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
    this._damage = (value > 40) ? 40 : (value < 0) ? 0 : value;
    const woundLevelIndex = Math.ceil(this._damage/4);
    if( !this.ignoreSaves) {
      this.setSavePenalities((woundLevelIndex - 1), (woundLevelIndex - 4));
    } else {
      this.setSavePenalities(0, 0);
    }

    if (!this.ignoreWounds) {
      if (woundLevelIndex === 1 ) {
        this.setWoundPenalities( Cp2020_WOUND_LEVELS.LIGHT, 0, 1, 1, 1);
      } else if (woundLevelIndex === 2) {
        this.setWoundPenalities( Cp2020_WOUND_LEVELS.SERIOUS, -2, 1, 1, 1);
      } else if (woundLevelIndex === 3) {
        this.setWoundPenalities( Cp2020_WOUND_LEVELS.CRITICAL, 0, 0.5, 0.5, 0.5);
      } else if (woundLevelIndex > 3) {
        let level = Cp2020_WOUND_LEVELS.MORTAL_0;
        switch (woundLevelIndex) {
          case 4:
            level = Cp2020_WOUND_LEVELS.MORTAL_0;
            break;
          case 5:
            level = Cp2020_WOUND_LEVELS.MORTAL_1;
            break;
          case 6:
            level = Cp2020_WOUND_LEVELS.MORTAL_2;
            break;
          case 7:
            level = Cp2020_WOUND_LEVELS.MORTAL_3;
            break;
          case 8:
            level = Cp2020_WOUND_LEVELS.MORTAL_4;
            break;
          case 9:
            level = Cp2020_WOUND_LEVELS.MORTAL_5;
            break;
          default:
            level = Cp2020_WOUND_LEVELS.MORTAL_6;
            break;
        }
        this.setWoundPenalities( level, 0, 0.33, 0.33, 0.33);
      } else {
        this.setWoundPenalities( Cp2020_WOUND_LEVELS.NONE, 0, 1, 1, 1);
      }
    } else {
      this.setWoundPenalities( Cp2020_WOUND_LEVELS.NONE, 0, 1, 1, 1);
    }
  }

  private setSavePenalities(stun: number, death: number) {
    this.StunSaveMod = (stun < 0) ? 0 : stun;
    this.DeathSaveMod = (death < 0) ? 0 : death;
  }

  private setWoundPenalities(woundLevel: Cp2020_WOUND_LEVELS, refMod: number, refMulti: number, intMod: number, coolMod: number) {
    this.WoundLevel = woundLevel;
    this.REF.WoundModifier = refMod;
    this.REF.Multiplier = refMulti;
    this.INT.Multiplier = intMod;
    this.COOL.Multiplier = coolMod;
  }

  private setHCCost() {
    if (!this.EMP.modifiers) {
      this.EMP.modifiers = new Array<StatModifier>();
    }
    if (!this.EMP.modifiers.some(m => m.name === 'HC')) {
      this.EMP.modifiers.push({ name: 'HC', mod: -Math.floor(this._humanityCost / 10) });
    } else {
      const i = this.EMP.modifiers.findIndex(m => m.name === 'HC');
      if (i > -1) {
        this.EMP.modifiers[i].mod = -Math.floor(this._humanityCost / 10);
      }
    }

  }
}
