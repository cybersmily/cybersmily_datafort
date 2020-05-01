import { faDice } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { Cp2020StatBlock } from './../../shared/models/cp2020character/cp2020-stat-block';
import { Cp2020Stat } from './../../shared/models/cp2020character/cp2020-stat';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-stats',
  templateUrl: './cmbt-trck-stats.component.html',
  styleUrls: ['./cmbt-trck-stats.component.css']
})
export class CmbtTrckStatsComponent implements OnInit {
  faDice = faDice;
  @Input()
  statBlock = new Cp2020StatBlock();

  @Output()
  changeStatBlock = new EventEmitter<Cp2020StatBlock>();

  constructor(private dice: DiceService) { }

  ngOnInit() {
  }

  changeStat(stat: Cp2020Stat, statName: string) {
    this.statBlock[statName] = stat;
    this.changeStatBlock.emit(this.statBlock);
  }

  generateStats() {
    this.statBlock.INT.Base = this.dice.generateNumber(2, 10);
    this.statBlock.REF.Base = this.dice.generateNumber(2, 10);
    this.statBlock.COOL.Base = this.dice.generateNumber(2, 10);
    this.statBlock.TECH.Base = this.dice.generateNumber(2, 10);
    this.statBlock.LUCK.Base = this.dice.generateNumber(2, 10);
    this.statBlock.MA.Base = this.dice.generateNumber(2, 10);
    this.statBlock.ATTR.Base = this.dice.generateNumber(2, 10);
    this.statBlock.EMP.Base = this.dice.generateNumber(2, 10);
    this.statBlock.BODY.Base = this.dice.generateNumber(2, 10);
    this.changeStatBlock.emit(this.statBlock);
  }
}
