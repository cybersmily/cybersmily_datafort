import { DiceService } from './../../shared/services/dice/dice.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Cp2020StatBlock } from './../../shared/models/cp2020character/cp2020-stat-block';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-wound-sect',
  templateUrl: './cmbt-trck-wound-sect.component.html',
  styleUrls: ['./cmbt-trck-wound-sect.component.css']
})
export class CmbtTrckWoundSectComponent implements OnInit {
  faDice = faDice;

  @Input()
  stats = new Cp2020StatBlock();

  @Output()
  updateStats = new EventEmitter<Cp2020StatBlock>();

  deathSaveMod = 0;
  deathSaveResults = '';
  stunSaveMod = 0;
  stunSaveResults = '';

  constructor(private diceService: DiceService) { }

  ngOnInit() {
  }

  onChangeDamage(event: number) {
    this.stats.Damage = event;
    this.updateStats.emit(this.stats);
  }

  changeStun() {
    this.updateStats.emit(this.stats);
  }

  changeDeathState() {
    this.updateStats.emit(this.stats);
  }

  onShowSaves() {
    this.deathSaveResults = '';
    this.stunSaveResults = '';
  }

  rollDeathSave() {
    if (this.rollSave(this.stats.DeathSave, 'Death', this.deathSaveMod)) {
      this.deathSaveResults = 'Save Death roll';
    } else {
      this.deathSaveResults = 'Failed Death Save. On the road to the bodybank...';
      this.stats.deathState = 1;
      this.updateStats.emit(this.stats);
    }
  }

  rollStunSave() {
    if (this.rollSave(this.stats.Save, 'Stun', this.stunSaveMod)) {
      this.stunSaveResults = 'Save Stun roll.';
    } else {
      this.stunSaveResults = 'Failed Stun save. Combatant is stunned.';
      this.stats.isStunned = true;
      this.updateStats.emit(this.stats);
    }
  }

  private rollSave(save: number, saveType: string, mod: number): boolean {
    let roll = this.diceService.generateNumber(1, 10);
    roll = roll - (isNaN(mod) ? 0 : mod);
    return (roll <= save);
  }

}
