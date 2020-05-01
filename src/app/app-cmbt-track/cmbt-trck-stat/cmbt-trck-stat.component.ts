import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cp2020Stat } from './../../shared/models/cp2020character';

@Component({
  selector: 'cs-cmbt-trck-stat',
  templateUrl: './cmbt-trck-stat.component.html',
  styleUrls: ['./cmbt-trck-stat.component.css']
})
export class CmbtTrckStatComponent implements OnInit {
  faDice = faDice;

  @Input()
  statName = '';

  @Output()
  changeStat = new EventEmitter<Cp2020Stat>();

  @Input()
  stat = new Cp2020Stat();

  statResults = '';
  saveResults = '';

  constructor( private diceService: DiceService) { }

  get isWounded(): boolean {
    return (this.stat.Multiplier !== 1 || this.stat.WoundModifier !== 0);
  }

  ngOnInit() {
  }

  onChangeStat() {
    this.changeStat.emit(this.stat);
  }

  onChangeModifier() {
    this.changeStat.emit(this.stat);
  }

  rollStat() {
    let roll = this.diceService.generateNumber(1, 10);
    let total = roll;
    let dieRoll = '[ ' + roll + ' ';
    while (roll === 10) {
      roll = this.diceService.generateNumber(1, 10);
      total += roll;
      dieRoll += roll + ' ';
    }
    dieRoll += ' ]';
    this.statResults = (this.stat.Adjusted + total) + ' = ' + this.stat.Adjusted + '(STAT) + ' + total + '(Dice)' + dieRoll + '';
  }

  rollSave() {
    const roll = this.diceService.generateNumber(1, 10);
    this.saveResults = (this.stat.Adjusted >= roll) ? 'Saved! Die roll ' + roll : 'Save Failed! Die roll ' + roll;
  }

}
