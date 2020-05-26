import { FumbleChart } from './../../shared/models/skill';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CombatModifiers } from '../../shared/models/cmbt-trck';
import { faDice, faRedo } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon, CombatRange } from '../../shared/models/weapon';
import { Component, OnInit, Input } from '@angular/core';
import { Cp2020PlayerSkill, Cp2020Stat } from './../../shared/models/cp2020character';

@Component({
  selector: 'cs-cmbt-trck-mod-wpn',
  templateUrl: './cmbt-trck-mod-wpn.component.html',
  styleUrls: ['./cmbt-trck-mod-wpn.component.css']
})
export class CmbtTrckModWpnComponent implements OnInit {
  faDice = faDice;
  faRedo  = faRedo;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Input()
  skills: Array<Cp2020PlayerSkill> = new Array<Cp2020PlayerSkill>();

  @Input()
  REF: Cp2020Stat = new Cp2020Stat();

  @Input()
  rangeToTarget = 0;

  @Input()
  modifiers: CombatModifiers = new CombatModifiers();

  selectedSkill: Cp2020PlayerSkill = new Cp2020PlayerSkill();
  spentAmmo = 0;

  damageRoll: string;
  unjammRoll: string;
  skillRoll: string;
  jammed = 0;

  constructor(private diceService: DiceService) { }

  ngOnInit() {
    if ( this.skills && this.skills.length > 0) {
      this.selectedSkill = this.skills[0];
    }
  }

  getWeaponMods(wpn: CpPlayerWeapon): number {
    return wpn.wa + this.selectedSkill.value + this.REF.Adjusted + this.modifiers.totalModifiers;
  }

  rollReliability() {
    const roll = this.diceService.generateNumber(1, 10);
    this.weapon.checkReliability(roll);
    if (this.weapon.jammed) {
      this.jammed = this.diceService.generateNumber(1, 6);
    }
  }

  get rangeBracket(): CombatRange {
    return this.weapon.getRangeBracket(this.rangeToTarget);
  }

  unjamWeapon() {
    this.weapon.jammed = false;
  }

  rollDamage() {
    const roll = this.diceService.rollDice(this.weapon.damage);
    this.damageRoll = roll.total + '[' + roll.rolls.join(', ') + ']';
  }

  rollSkill() {
    this.skillRoll = this.selectedSkill.value + '(skill) ';
    this.skillRoll += '+ ' + this.REF.Adjusted + '(REF) ';
    this.skillRoll += ((this.weapon.wa >= 0) ? '+' : '') + '(wa) ';
    this.skillRoll += '+ ' + this.modifiers.totalModifiers + '(mods) ';
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
    const diff = this.weapon.getRangeBracket(this.rangeToTarget).diff;
    const totalRoll = this.getWeaponMods(this.weapon) + total;
    if (roll === 1 ) {
      this.skillRoll += 'Fumbled! ' + FumbleChart.getResults(this.diceService.generateNumber(1, 10), this.selectedSkill);
    } else {
      this.skillRoll += (totalRoll >= diff) ? 'Succeeded by ' + (totalRoll - diff) : 'Missed';
    }
    this.skillRoll += ' (Total:' + totalRoll + ' vs DIFF:' + diff + ')';
  }

  reloadAmmo() {
    this.weapon.shotsUsed = 0;
  }
}
