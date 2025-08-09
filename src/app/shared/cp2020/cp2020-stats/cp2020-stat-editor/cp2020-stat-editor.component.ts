import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cp2020Stat, StatModifier } from './../models/cp2020-stat';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'cs-cp2020-stat-editor',
    templateUrl: './cp2020-stat-editor.component.html',
    styleUrls: ['./cp2020-stat-editor.component.css'],
    standalone: false
})
export class Cp2020StatEditorComponent implements OnInit, AfterViewInit {
  faPlus = faPlus;
  faTrash = faTrash;

  @Input()
  stat: Cp2020Stat = new Cp2020Stat();

  @Input()
  statName = '';

  @Output()
  changeStat: EventEmitter<{statName: string, stat: Cp2020Stat}> = new EventEmitter<{statName: string, stat: Cp2020Stat}>();

  @ViewChild('statBaseElem', {static: false})
  baseElem: ElementRef;

  newStatModifier: StatModifier = {name: '', mod: 0};

  get isWounded(): boolean {
    return (this.stat.WoundModifier < 0 || this.stat.Multiplier !== 1 );
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.baseElem.nativeElement.focus();
  }

  onStatChange() {
    this.changeStat.emit({statName: this.statName, stat: this.stat});
  }

  addModifier() {
    if ( this.newStatModifier.name !== '') {
      this.stat.modifiers.push({name: this.newStatModifier.name, mod: this.newStatModifier.mod});
      this.onStatChange();
    }
  }

  deleteModifier(index: number) {
    this.stat.modifiers.splice(index, 1);
    this.onStatChange();
  }

}
