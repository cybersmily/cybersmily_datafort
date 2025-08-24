import { CpRedCharacterAddiction } from '../../models/cp-red-character-addiction';
import { Observable, map } from 'rxjs';
import { CpRedWoundsManagerService } from '../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faPen,
  faPlus,
  faTrash,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'cs-cp-red-addiction-editor',
    templateUrl: './cp-red-addiction-editor.component.html',
    styleUrls: ['./cp-red-addiction-editor.component.css'],
    standalone: false
})
export class CpRedAddictionEditorComponent implements OnInit {
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;
  faSave = faSave;

  newAddiction: CpRedCharacterAddiction = new CpRedCharacterAddiction();

  @Input()
  addiction: CpRedCharacterAddiction;

  @Input()
  showDelete = false;

  @Input()
  showAdd = false;

  @Input()
  showSave = false;

  @Output()
  addAddiction: EventEmitter<CpRedCharacterAddiction> = new EventEmitter<CpRedCharacterAddiction>();

  @Output()
  updateAddiction: EventEmitter<{
    addictionName: string;
    addiction: CpRedCharacterAddiction;
  }> = new EventEmitter<{
    addictionName: string;
    addiction: CpRedCharacterAddiction;
  }>();

  @Output()
  deleteAddiction: EventEmitter<CpRedCharacterAddiction> = new EventEmitter<CpRedCharacterAddiction>();

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
      .hasAddiction(this.newAddiction?.name)
      .pipe(
        map(
          (found) =>
            found ||
            !this.newAddiction.name ||
            this.newAddiction.name.trim() === ''
        )
      );
  }

  ngOnInit(): void {
    if (this.addiction) {
      this.newAddiction = new CpRedCharacterAddiction(this.addiction);
    }
  }

  update(): void {
    this.updateAddiction.emit({
      addictionName: this.addiction.name,
      addiction: this.newAddiction,
    });
  }

  add(): void {
    this.addAddiction.emit(this.newAddiction);
    this.newAddiction = new CpRedCharacterAddiction();
  }

  delete(): void {
    this.deleteAddiction.emit(this.newAddiction);
  }

  toggleEdit(): void {}
}
