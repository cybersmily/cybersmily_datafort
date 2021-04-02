import { DiceRolls } from './../../../models/dice-rolls';
import { StatModifier, Cp2020Stat } from './../../../models/cp2020character/cp2020-stat';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DiceService } from './../../../services/dice/dice.service';
import { faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Cp2020StatBlock } from './../../../models/cp2020character';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-stats',
  templateUrl: './cp2020-stats.component.html',
  styleUrls: ['./cp2020-stats.component.css']
})
export class Cp2020StatsComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  rolls: Array<number> = new Array<number>();
  newInitModifier: StatModifier = {name: '', mod: 0};
  initiativeRoll: DiceRolls = new DiceRolls();
  showInitiativeRoll = false;


  @Input()
  stats = new Cp2020StatBlock();

  @Input()
  showCharacterPoints = true;

  @Input()
  combatSense = 0;


  @Input()
  showRollInitiative = true;

  @Output()
  changeStats = new EventEmitter<Cp2020StatBlock>();


  constructor(private dice: DiceService, private modalService: BsModalService) { }

  ngOnInit() {
  }

  onStatsChange() {
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

  rollInitiative(){
    this.initiativeRoll = this.dice.rollCP2020D10();
  }

  onStatChange(param: {statName: string, stat: Cp2020Stat}) {
    this.stats[param.statName] = param.stat;
    this.changeStats.emit(this.stats);
  }
  get isOver(): boolean {
    return (this.stats.CurrentPoints < 0);
  }

  get totalInitiative(): number {
    let total = this.stats.REF.Adjusted;
    total += this.combatSense;
    total += this.stats.initiativeModifiers.reduce( (a, b) => a + b.mod, 0);
    return total;
  }

  addModifier() {
    this.stats.initiativeModifiers.push({name: this.newInitModifier.name, mod: this.newInitModifier.mod});
    this.onStatsChange();
  }

  deleteModifier(index: number) {
    this.stats.initiativeModifiers.splice(index, 1);
    this.onStatsChange();
  }

  openModal(template: TemplateRef<any>, showInit: boolean) {
    this.showInitiativeRoll = showInit;
    if (showInit) {
      this.rollInitiative();
    }
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
