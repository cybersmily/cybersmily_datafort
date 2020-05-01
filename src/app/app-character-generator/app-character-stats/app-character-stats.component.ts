import { DiceService } from './../../shared/services/dice/dice.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Cp2020StatBlock } from './../../shared/models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-app-character-stats',
  templateUrl: './app-character-stats.component.html',
  styleUrls: ['./app-character-stats.component.css']
})
export class AppCharacterStatsComponent implements OnInit {
  faDice = faDice;
  rolls: Array<number> = new Array<number>();


  @Input()
  stats = new Cp2020StatBlock();

  @Output()
  changeStats = new EventEmitter<Cp2020StatBlock>();

  constructor(private dice: DiceService) { }

  ngOnInit() {
  }

  onStatChange() {
    this.changeStats.emit(this.stats);
  }


  /**
   * Roll for the stats with 9d10, rerolling 1s
   *
   * @memberof AppCharacterStatsComponent
   */
  rollCharacterPoints() {
    let total = 0;
    this.rolls = new Array<number>();
    for ( let i = 0; i < 9; i++) {
      const roll = this.dice.generateNumber(2, 10);
      this.rolls.push(roll);
      total += roll;
    }
    this.stats.BasePoints = total;
    this.changeStats.emit(this.stats);
  }

  get isOver(): boolean {
    return (this.stats.CurrentPoints < 0);
  }

}
