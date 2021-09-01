import { CpPlayerWeaponOption } from './cp-player-weapon-option';
import { DiceRolls } from './../../../models/dice-rolls';
import { Cp2020PlayerSkill } from '../../cp2020-skills/models/cp2020-player-skill';
import { DiceService } from './../../../services/dice/dice.service';
import { SourceBook } from './../../../models/sourcebook';
import { WeaponRanges } from './weapon-ranges';
import { CombatRange } from './combat-range';
import { FumbleChart } from './../../../models/skill/fumble-chart';
import { CpWeapon } from '.';
import { Cp2020WeaponMagazine } from './cp-2020-weapon-magazine';


export interface toHitResults {
  dieRoll: DiceRolls;
  results: Array<string>;
}

export class CpPlayerWeapon implements CpWeapon {
  name: string;
  type: string;
  wa: number;
  conc: string;
  avail: string;
  damage: string;
  ammo: string;
  ammoType?: string;
  shots: number;
  rof: number;
  rel: string;
  jammed: boolean;
  cost: number;
  notes: string;
  range: number;
  cased?: boolean;
  source?: SourceBook;
  count?: number;
  thrown?: boolean;
  options?: Array<CpPlayerWeaponOption>;
  magazines?: Array<Cp2020WeaponMagazine>;
  currMagIndex?: number;

  constructor(param?) {
    // weapon prop is deprecated. There for backward support
    this.name = param?.weapon || param?.name || '';
    this.type = param?.type || '';
    // WA need to see if there is a + in it
    if (param?.wa && typeof param.wa === 'string') {
      this.wa =
        param && !isNaN(Number(String(param.wa).replace('+', '')))
          ? Number(String(param.wa).replace('+', ''))
          : 0;
    } else {
      this.wa = param?.wa;
    }
    this.conc = param?.conc?.toUpperCase() || 'N';
    this.avail = param?.avail?.toUpperCase() || 'C';
    this.damage = param?.damage || '';
    this.ammo = param?.ammo || '';
    // shots could be a string for backward capability.
    if (param?.shots && typeof param.shots === 'string') {
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
    if (param?.rof && typeof param.rof === 'string') {
      this.wa =
        param && !isNaN(Number(String(param.rof).replace('+', '')))
          ? Number(String(param.rof).replace('+', ''))
          : 0;
    } else if (param && param.rof && typeof param.rof === 'number') {
      this.rof = param.rof;
    } else {
      this.rof = param && param.rof ? 0 : undefined;
    }
    if (this.shots > 1) {
      this.magazines = new Array();
      this.magazines.push({ammo:this.ammo, capacity: this.shots, used: 0, cost: 0, multiplier: 1});
    }
    if (param && param.magazines) {
      this.magazines = new Array(...param.magazines);
    }

    this.currMagIndex = param?.currMagIndex || (this.magazines) ? 0 : undefined;

    this.cost = param?.cost || 0;
    this.range = param?.range || this.getDefaultRange();
    this.rel = param?.rel?.toUpperCase() || '';
    this.jammed = param?.jammed || false;
    this.notes = param?.notes || '';
    this.source = param?.source;
    this.count = param?.count || 0;
    this.thrown = param?.thrown;
    this.cased = param?.cased || false;
    if(param?.options) {
      this.options = param.options.map( opt => new CpPlayerWeaponOption(opt));
    }
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

  get isRangedWeapon(): boolean {
    return (
      this.type.toLowerCase() !== 'mel' ||
      this.thrown
    );
  }

  get currMag(): Cp2020WeaponMagazine {
    if (this.magazines && this.currMagIndex > -1) {
      return this.magazines[this.currMagIndex];
    }
  }

  get isEmpty(): boolean {
    return (this.currMag ) ? this.currMag.used >= this.currMag.capacity : false;
  }

  get shotsRemaining(): number {
    return (this.currMag ) ? this.currMag.capacity - this.currMag.used : 1;
  }

  reload() {
    const i = this.magazines.findIndex( mag => mag.used < mag.capacity);
    if(i > -1) {
      this.currMagIndex = i;
    } else {
      this.magazines[0].used = 0;
    }
  }

  expendShot(index: number) {
    const mod = (index + 1) !== this.magazines[this.currMagIndex].used ? 1 : 0;
    this.magazines[this.currMagIndex].used = index + mod;
  }

  fire(
    diceService: DiceService,
    stat: number = 0,
    skillValue: number = 0,
    shots?: number
  ): string {
    const roll = diceService.rollCP2020D10();
    if (this.currMagIndex > -1 && !isNaN(shots)) {
      this.magazines[this.currMagIndex].used += shots;
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
      numberOfShots = numberOfShots < 1 ? 1 : numberOfShots;
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
        results.push(msg + `= ${total} to ${location}`);
      }
    }
    return results;
  }

  rollToHit(dice: DiceService, ref: number, skill: Cp2020PlayerSkill,
    diff: number, fireMode: number, shotsFired: number,
    bodyDamageMod: number
  ): toHitResults {
    const results: toHitResults = { dieRoll: new DiceRolls, results: [] };
    if (this.isRangedWeapon && this.isEmpty) {
      return { dieRoll: new DiceRolls, results: ['Weapon needs to be reloaded'] };
    }
    const toHitDiceRoll = dice.rollCP2020D10();
    const totalToHit = skill.value + ref + this.wa + toHitDiceRoll.total;
    results.dieRoll = toHitDiceRoll;
    let shots = shotsFired ? shotsFired : 1;
    shots =  (fireMode === 1) ? 3 : shots;
    const remainingRounds = this.shotsRemaining;
    shots = (shots > remainingRounds) ? remainingRounds : shots;
    this.fire(
      dice,
      ref,
      skill.value,
      shots
    );
    const degreeOfSuccess = (totalToHit - diff) + 1;
    let successMsg = '';
    if (degreeOfSuccess > 0 && toHitDiceRoll.rolls[0] !== 1) {
      if  (fireMode === 1) {
        const rounds = shots < 3 ? shots : 3;
        shots = dice.generateNumber(1, rounds);

      } else {
        shots =
        degreeOfSuccess > shots
          ? shots
          : degreeOfSuccess;
      }
      // check if martial arts skill.
      const maDmg = (skill.name.toLowerCase().startsWith('martial')) ? skill.value : undefined;
      const dmg = this.rollDamage(dice, shots, bodyDamageMod, maDmg);
      if (shots > 1) {
        successMsg = `${shots} round${shots > 1 ? 's' : ''}`;
      } else {
        successMsg = '1';
      }
      results.results = [`Success! ${successMsg} hit!`, ...dmg];
    } else if (toHitDiceRoll.rolls[0] === 1) {
      const msg = FumbleChart.getResults(
        dice.generateNumber(1, 10),
        skill
      );
      const jammed =
        msg.indexOf('jam') > 0
          ? this.checkReliability(dice)
          : '';
      results.results = ['Fumbled!', msg, jammed];
    } else {
      results.results = ['Missed!'];
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
        : (this.damage || '-');
    return `${this.type} ${this.wa || '-'} ${this.conc || '-'} ${this.avail || '-'
      } ${ammoDmg} ${this.shots || '-'} ${this.rof || '-'} ${this.rel || '-'}`;
  }
}
