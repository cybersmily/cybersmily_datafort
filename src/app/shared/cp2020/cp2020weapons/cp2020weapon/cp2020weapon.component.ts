import { Cp2020PlayerSkill } from './../../../models/cp2020character';
import { DiceService } from './../../../services/dice/dice.service';
import { faPen, faTrash, faDice } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon } from './../../../models/weapon/cp-player-weapon';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon',
  templateUrl: './cp2020weapon.component.html',
  styleUrls: ['./cp2020weapon.component.css']
})
export class Cp2020weaponComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faDice = faDice;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Input()
  skill: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  Ref = 0;

  @Input()
  BodDamageMod = 0;

  weaponShots: Array<boolean>;

  selectShot: number;

  unjammRoll: string;
  jammed = 0;
  damageRoll = '';
  skillRoll = '';

  constructor(private diceService: DiceService) { }

  ngOnInit(): void {
    if (this.weapon.shots && this.weapon.shots > 0) {
      this.weaponShots = new Array<boolean>(this.weapon.shots);
      this.weaponShots.fill(false);
    } else {
      this.weaponShots = undefined;
    }
  }

  get usedShots(): number {
    return this.weaponShots.reduce( (a, b) => a + (b ? 1 : 0), 0);
  }

  checkShots(index: number) {
    if (this.weaponShots) {
      if ( index === this.selectShot) {
        this.weaponShots[index] = false;
      } else {
        this.selectShot = index;
        this.weaponShots.fill(true, 0, index + 1);
        this.weaponShots.fill(false, index + 1);
      }
    }
  }

  rollReliability() {
    const roll = this.diceService.generateNumber(1, 10);
    this.weapon.checkReliability(roll);
    if (this.weapon.jammed) {
      this.jammed = this.diceService.generateNumber(1, 6);
    }
  }


  rollDamage() {
    const roll = this.diceService.rollMoreDice(this.weapon.damage);
    if (this.weapon.type.toLowerCase() === 'mel') {
      roll.total += this.BodDamageMod;
    }
    this.damageRoll = `${roll.show()}${ this.weapon.type.toLowerCase() === 'mel' ? ' +  ' + this.BodDamageMod + '(BOD Mod)' : ''}`;
  }

  rollToHit() {
    // this.skillRoll = this.selectedSkill.value + '(skill) ';
    this.skillRoll += '+ ' + this.Ref + '(REF) ';
    this.skillRoll += ((this.weapon.wa >= 0) ? '+ ' + this.weapon.wa : '') + '(wa) ';
    // this.skillRoll += '+ ' + this.modifiers.totalModifiers + '(mods) ';
    let roll = this.diceService.generateNumber(1, 10);
    let dieRolls = '[ ' + roll;
    let total = roll;
    while ( roll === 10) {
      roll = this.diceService.generateNumber(1, 10);
      total += roll;
      dieRolls += ' ' + roll;
    }
    dieRolls += ' ]';
    this.skillRoll += '+ ' + total + '(dice)' + dieRolls + '<br>';
    // const diff = this.weapon.getRangeBracket(this.rangeToTarget).diff;
    // const totalRoll = this.getWeaponMods(this.weapon) + total;
    /*
    if (roll === 1 ) {
      this.skillRoll += 'Fumbled! ' + FumbleChart.getResults(this.diceService.generateNumber(1, 10), this.selectedSkill);
    } else {
      this.skillRoll += (totalRoll >= diff) ? 'Succeeded by ' + (totalRoll - diff) : 'Missed';
    }
    this.skillRoll += ' (Total:' + totalRoll + ' vs DIFF:' + diff + ')';
    */
  }
}
