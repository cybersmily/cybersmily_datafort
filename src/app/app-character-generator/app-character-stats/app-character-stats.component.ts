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
    for (let i = 0; i < 9; i++) {
      const roll = this.dice.generateNumber(3, 10);
      this.rolls.push(roll);
      total += roll;
    }
    this.stats.BasePoints = total;
    this.changeStats.emit(this.stats);
  }

  rollStats() {
    const statNames = ['INT', 'REF', 'BODY', 'COOL', 'TECH', 'EMP', 'ATTR', 'MA', 'LUCK'];
    if (this.rolls.length > 0) {
      const stats = [...this.rolls];
      // randomly assign to each stat
      statNames.forEach( s => {
        this.stats[s].Base = stats.splice(this.dice.generateNumber(0, stats.length - 1), 1)[0];
      });
    } else if (this.stats.BasePoints > 0) {
      // distribute base points among stats
      let stats = this.stats.BasePoints - 27;
      // initialize all stats at a base of 3
      statNames.forEach( s => {
        this.stats[s].Base = 3;
      });
      let index = 0;
      do {
        const max = (stats > 7) ? 7 : stats;
        // check if it is the first time.
        if (this.stats[statNames[index]].Base > 3 ) {
          const roll = this.dice.generateNumber(0, max);
          stats -= roll;
          this.stats[statNames[index]].Base += roll;
        } else {
          const delta = 10 - this.stats[statNames[index]].Base;
          const roll = this.dice.generateNumber(1, max);
          stats -= roll;
          this.stats[statNames[index]].Base += roll;
        }
        index = (index < statNames.length - 1) ? (index + 1) : 0;
      } while (stats > 0);
    } else {
      // roll each stat separately
      statNames.forEach( s => {
        this.stats[s].Base = this.dice.generateNumber(3, 10);
      });
    }
  }

  get isOver(): boolean {
    return (this.stats.CurrentPoints < 0);
  }

}
