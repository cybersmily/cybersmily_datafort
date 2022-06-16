import { CpRedStatMod } from '../../models/cp-red-stat-mod';
import {
  faPlus,
  faChevronDown,
  faChevronRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CpRedStat } from './../../models/cp-red-stat';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'cs-cp-red-stat-editor',
  templateUrl: './cp-red-stat-editor.component.html',
  styleUrls: ['./cp-red-stat-editor.component.css'],
})
export class CPRedStatEditorComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faIcon = this.faChevronRight;
  faTrash = faTrash;

  showModifiers = false;

  newMod: CpRedStatMod = {
    name: null,
    value: null,
    active: true,
  };

  @Input()
  stat: CpRedStat;
  currStat: CpRedStat;

  @Output()
  changeStat: EventEmitter<CpRedStat> = new EventEmitter<CpRedStat>();

  constructor() {}

  ngOnInit(): void {
    this.currStat = this.stat;
  }
  ngOnChanges(): void {
    this.currStat = this.stat;
  }

  updateStatBase(): void {
    this.changeStat.emit(this.currStat);
  }

  toggleModifiers(): void {
    this.showModifiers = !this.showModifiers;
    this.faIcon = this.showModifiers ? this.faChevronDown : this.faChevronRight;
    this.changeStat.emit(this.currStat);
  }

  activateModifier(index: number): void {
    this.currStat.modifiers[index].active =
      !this.currStat.modifiers[index].active;
    this.changeStat.emit(this.currStat);
  }

  delectModifier(index: number): void {
    this.currStat.modifiers.splice(index, 1);
    this.changeStat.emit(this.currStat);
  }

  addModifier(): void {
    this.currStat.modifiers.push({ ...this.newMod });
    this.newMod = {
      name: null,
      value: null,
      active: true,
    };
    this.changeStat.emit(this.currStat);
  }
}
