import { CpRedCharacterCriticalInjury } from './../../models/cp-red-character-critical-injury';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-injuries-editor',
  templateUrl: './cp-red-injuries-editor.component.html',
  styleUrls: ['./cp-red-injuries-editor.component.css'],
})
export class CpRedInjuriesEditorComponent implements OnInit {
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  newInjury: CpRedCharacterCriticalInjury = new CpRedCharacterCriticalInjury();

  @Input()
  injury: CpRedCharacterCriticalInjury;

  @Input()
  showDelete = false;

  @Input()
  showAdd = false;

  @Output()
  updateInjury: EventEmitter<CpRedCharacterCriticalInjury> = new EventEmitter<CpRedCharacterCriticalInjury>();

  constructor() {}
  /**
   * Only enable adding if the name is not blank and doesn't already exist.
   *
   * @readonly
   * @type {boolean}
   * @memberof CpRedInjuriesDisplayComponent
   */
  get isAddDisabled(): boolean {
    return (
      this.newInjury.name === ''
      /*
       ||
      this.currInjuries.some(
        (inj) => inj.name.toLowerCase() === this.newInjury.name.toLowerCase()
      )*/
    );
  }

  ngOnInit(): void {}

  add(): void {}

  delete(): void {}

  toggleEdit(): void {}
}
