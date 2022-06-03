import { AppCpRedDatingModule } from './../../../../app-cp-red-dating/app-cp-red-dating.module';
import { CpRedStatMod } from './../../models/cp-red-stat-mod';
import {
  faPlus,
  faChevronDown,
  faChevronRight,
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
  updateStat: EventEmitter<CpRedStat> = new EventEmitter<CpRedStat>();

  constructor() {}

  ngOnInit(): void {
    this.currStat = this.stat;
  }
  ngOnChanges(): void {
    this.currStat = this.stat;
  }

  toggleModifiers(): void {
    this.showModifiers = !this.showModifiers;
    this.faIcon = this.showModifiers ? this.faChevronDown : this.faChevronRight;
  }

  addModifier(): void {
    this.currStat.modifiers.push({ ...this.newMod });
    this.newMod = {
      name: null,
      value: null,
      active: true,
    };
  }
}
