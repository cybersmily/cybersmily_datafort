import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CmbtTrckOpponent } from '../../shared/models/cmbt-trck';
import { faDice,faTrash, faCopy, faEyeSlash, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { Cp2020StatBlock } from '../../shared/cp2020/cp2020-stats/models';
import { OpponentTrackerService } from '../services/opponent-tracker.service';
import {CmbtTrckWoundDisplayService } from '../services/cmbt-trck-wound-display.service';

@Component({
    selector: 'cs-cmbt-trck-opponent-row',
    templateUrl: './cmbt-trck-opponent-row.component.html',
    styleUrls: ['./cmbt-trck-opponent-row.component.css'],
    standalone: false
})
export class CmbtTrckOpponentRowComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;
  faCopy = faCopy;
  faEyeSlash = faEyeSlash;
  faSkullCrossbones = faSkullCrossbones;

  @Input()
  opponent: CmbtTrckOpponent = new CmbtTrckOpponent();

  @Input()
  index = -1;

  @Input()
  selected = false;

  @Input()
  active = false;

  @Input()
  showTools = false;

  @Output()
  selectIndex: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  selectInitiative:  EventEmitter<number> = new EventEmitter<number>();

  @Output()
  copy:  EventEmitter<number> = new EventEmitter<number>();

  @Output()
  delete:  EventEmitter<number> = new EventEmitter<number>();

  constructor(private opponentService: OpponentTrackerService, private woundService: CmbtTrckWoundDisplayService) {}

  ngOnInit(): void {

  }


  changeInitiative() {
    this.opponentService.sortInitiative();
  }


  setInitiative(index: number) {
    this.selectInitiative.emit(index);
  }

  showInitiativeMods(oppStats: Cp2020StatBlock, combatSense: number): string {
    let results = '';
    results = oppStats.initiativeModifiers.map( mod => `,${mod.name}: ${mod.mod > 0 ? '+' + mod.mod : mod.mod}`).join('');
    const cmbtSense = (combatSense > 0) ? `, Combat Sensse: +${combatSense}`  : '';
    results = `[REF: ${oppStats.REF.Adjusted}${cmbtSense}${results}]`;
    return results;
  }

  showInitiativeTooltip(opp: CmbtTrckOpponent): string {
    return `Initiative Roll(s): (${opp.initDie.join(' + ')}) + ${this.showInitiativeMods(opp.stats, opp.combatSense)}`;
  }

    /**
   * Roll initiative for all the Opponents
   *
   * @memberof CmbtTrckFormComponent
   */
    rollInitiative(id?: number) {
      this.opponentService.rollInitiative(id);
    }

    selectOpponent(index: number) {
      this.selectIndex.emit(index);
    }

    getWoundLevel(opp:CmbtTrckOpponent): string {
      return this.woundService.getWoundLevel(opp);
    }

    getWoundIcon(opp:CmbtTrckOpponent): Array<any> {
      return this.woundService.getWoundIcon(opp);
    }

    copyOpponent() {
      this.copy.emit(this.index);
    }

    removeOpponent() {
      this.delete.emit(this.index);
    }

}
