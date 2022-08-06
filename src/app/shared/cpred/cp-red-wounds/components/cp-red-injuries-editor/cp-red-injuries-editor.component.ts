import { Observable, map } from 'rxjs';
import { CpRedWoundsManagerService } from './../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { CpRedCharacterCriticalInjury } from './../../models/cp-red-character-critical-injury';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faPen,
  faPlus,
  faTrash,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-cp-red-injuries-editor',
  templateUrl: './cp-red-injuries-editor.component.html',
  styleUrls: ['./cp-red-injuries-editor.component.css'],
})
export class CpRedInjuriesEditorComponent implements OnInit {
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;
  faSave = faSave;

  newInjury: CpRedCharacterCriticalInjury = new CpRedCharacterCriticalInjury();

  @Input()
  injury: CpRedCharacterCriticalInjury;

  @Input()
  showDelete = false;

  @Input()
  showAdd = false;

  @Input()
  showSave = false;

  @Output()
  addInjury: EventEmitter<CpRedCharacterCriticalInjury> = new EventEmitter<CpRedCharacterCriticalInjury>();

  @Output()
  updateInjury: EventEmitter<{
    injuryName: string;
    injury: CpRedCharacterCriticalInjury;
  }> = new EventEmitter<{
    injuryName: string;
    injury: CpRedCharacterCriticalInjury;
  }>();

  @Output()
  deleteInjury: EventEmitter<CpRedCharacterCriticalInjury> = new EventEmitter<CpRedCharacterCriticalInjury>();

  constructor(private woundManager: CpRedWoundsManagerService) {}
  /**
   * Only enable adding if the name is not blank and doesn't already exist.
   *
   * @readonly
   * @type {boolean}
   * @memberof CpRedInjuriesDisplayComponent
   */
  get isAddDisabled$(): Observable<boolean> {
    return this.woundManager
      .hasCriticalInjury(this.newInjury?.name)
      .pipe(
        map(
          (found) =>
            found || !this.newInjury.name || this.newInjury.name.trim() === ''
        )
      );
  }

  ngOnInit(): void {
    if (this.injury) {
      this.newInjury = new CpRedCharacterCriticalInjury(this.injury);
    }
  }

  update(): void {
    console.log('update', this.injury.name, this.newInjury.name);
    this.updateInjury.emit({
      injuryName: this.injury.name,
      injury: this.newInjury,
    });
  }

  add(): void {
    this.addInjury.emit(this.newInjury);
    this.newInjury = new CpRedCharacterCriticalInjury();
  }

  delete(): void {
    this.deleteInjury.emit(this.newInjury);
  }

  toggleEdit(): void {}
}
