import { Cp2020PlayerSkill } from './../../cp2020-skills/models/cp2020-player-skill';
import { Cp2020StatBlock } from './../models/cp2020-stat-block';
import { DiceRolls } from './../../../models/dice-rolls';
import { StatModifier, Cp2020Stat } from './../models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DiceService } from './../../../services/dice/dice.service';
import { faDice, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-stats',
  templateUrl: './cp2020-stats.component.html',
  styleUrls: ['./cp2020-stats.component.css']
})
export class Cp2020StatsComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faTrash = faTrash;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };

  rolls: Array<number> = new Array<number>();
  newInitModifier: StatModifier = { name: '', mod: 0 };
  initiativeRoll: DiceRolls = new DiceRolls();
  showInitiativeRoll = false;
  useRolls: boolean = true;
  statNames = ['INT', 'REF', 'BODY', 'COOL', 'TECH', 'EMP', 'ATTR', 'MA', 'LUCK'];

  @Input()
  stats = new Cp2020StatBlock();

  @Input()
  showCharacterPoints = true;

  @Input()
  combatSense = 0;

  @Input()
  initiativeSkill: number = -1;

  @Input()
  showRollInitiative = true;

  @Output()
  changeStats = new EventEmitter<Cp2020StatBlock>();

  @ViewChild('initRollElem', { static: false })
  initRollElem: ElementRef;

  get isOver(): boolean {
    return (this.stats.CurrentPoints < 0);
  }

  get totalInitiative(): number {
    let total = this.stats.REF.Adjusted;
    total += this.combatSense;
    total += this.initiativeSkill > 0 ? this.initiativeSkill : 0;
    total += this.stats.initiativeModifiers.reduce((a, b) => a + b.mod, 0);
    return total;
  }

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
    this.onStatsChange();
  }

  rollStats() {
    if (this.rolls.length > 0) {
      this.assignToStats(this.statNames, [...this.rolls]);
    } else if (this.stats.BasePoints > 0) {
      let points = this.stats.BasePoints - 27;
      const randStats = Array(this.statNames.length).map(s => 3);
      // fill the stat array with points
      for (let i = 0; i < randStats.length; i++) {
        let statRoll = this.dice.generateNumber(0, 7);
        randStats[i] += statRoll;
        points -= statRoll;
      }
      // clean up the points if they exceed the bast points
      while (points !== 0) {
        const diff = randStats.reduce((a, b) => a + b, 0) - this.stats.BasePoints;
        // add/subtract until the points equal out
        for (let i = 0; i < diff; i++) {
          // randomly choose a stat to modify
          const index = this.dice.generateNumber(0, 9);
          if (randStats[index] < 10 && randStats[index] > 3) {
            randStats[index] += (diff > 0) ? 1 : -1;
            points -= 1;
          }
        }
      }
      this.assignToStats(this.statNames, randStats);
    } else {
      const randStats = [...Array(this.statNames.length)].map(_ => this.dice.generateNumber(3, 10));
      this.assignToStats(this.statNames, randStats);
    }
    this.onStatsChange();
  }

  private assignToStats(characterStats: Array<string>, statsRolls: Array<number>): void {
    // randomly assign to each stat
    characterStats.forEach(s => {
      this.stats[s].Base = statsRolls.splice(this.dice.generateNumber(0, statsRolls.length - 1), 1)[0];
    });
  }

  rollInitiative() {
    this.initiativeRoll = this.dice.rollCP2020D10();
  }

  onStatChange(param: { statName: string, stat: Cp2020Stat }) {
    this.stats[param?.statName] = param?.stat;
    this.onStatsChange();
  }

  updateInitiativeModifiers(modifiers: Array<StatModifier>) {
    this.stats.initiativeModifiers = [...modifiers];
    this.onStatsChange();
  }

  clearRolls() {
    this.rolls = new Array<number>();
  }

  openModal(template: TemplateRef<any>, showInit: boolean, returnFocus?: string) {
    this.showInitiativeRoll = showInit;
    if (showInit) {
      this.rollInitiative();
    }
    this.modalRef = this.modalService.show(template, this.modalConfig);
    this.modalRef.onHidden.subscribe(() => {
      switch (returnFocus) {
        case 'initElem':
          this.initRollElem.nativeElement.focus();
          break;
      }
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}
