import { DiceRolls } from './../../../models/dice-rolls';
import { StatModifier, Cp2020Stat } from './../models/cp2020-stat';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'cs-cp2020-initiative-editor',
    templateUrl: './cp2020-initiative-editor.component.html',
    styleUrls: ['./cp2020-initiative-editor.component.css'],
    standalone: false
})
export class Cp2020InitiativeEditorComponent implements OnInit, AfterViewInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  REF: Cp2020Stat = new Cp2020Stat();

  @Input()
  combatSense: number = 0;

  @Input()
  initiativeModifiers: Array<StatModifier> = new Array<StatModifier>();

  @Input()
  showInitiativeRoll = true;

  @Input()
  initiativeRoll: DiceRolls = new DiceRolls();


  @Output()
  updateInitiativeModifers: EventEmitter<Array<StatModifier>> = new EventEmitter<Array<StatModifier>>();

  @ViewChild('newInitModNameElem', {static: false})
  newModNameElem: ElementRef;

  newInitModifier: StatModifier = {name: '', mod: 0};
  initiativeSkill: number = -1;
  currInitModifiers:Array<StatModifier> = new Array<StatModifier>();

  get totalInitiative(): number {
    let total = this.REF.Adjusted;
    total += this.combatSense;
    total += this.initiativeSkill > 0 ? this.initiativeSkill : 0;
    total += this.initiativeModifiers.reduce( (a, b) => a + b.mod, 0);
    return total;
  }

  constructor() { }

  ngOnInit(): void {
    this.currInitModifiers = [...this.initiativeModifiers];
  }

  ngAfterViewInit(): void {
    this.newModNameElem.nativeElement.focus();
  }

  addModifier() {
    this.currInitModifiers.push({name: this.newInitModifier.name, mod: this.newInitModifier.mod});
    this.newInitModifier = {name: '', mod: 0};
    this.changeModifiers();
  }

  deleteModifier(index: number) {
    this.currInitModifiers.splice(index, 1);
    this.changeModifiers();
  }

  changeModifiers() {
    this.updateInitiativeModifers.emit(this.currInitModifiers);
  }

}
