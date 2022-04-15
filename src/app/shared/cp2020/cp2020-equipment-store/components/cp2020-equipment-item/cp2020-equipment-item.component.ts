import { Store, select } from '@ngrx/store';
import { cp2020EquipmentCategoriesSelector } from './../../selectors/cp2020-equipment-store-selector';
import { Observable } from 'rxjs';
import { faTrash, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cp2020Equipment } from '../../models';

@Component({
  selector: 'cs-cp2020-equipment-item',
  templateUrl: './cp2020-equipment-item.component.html',
  styleUrls: ['./cp2020-equipment-item.component.css'],
})
export class Cp2020EquipmentItemComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  faWindowClose = faWindowClose;
  isEditing = false;
  categories$: Observable<Array<string>>;
  currItem: Cp2020Equipment;

  @Input()
  item: Cp2020Equipment;

  @Input()
  isEditable: boolean = false;

  @Output()
  delete: EventEmitter<Cp2020Equipment> = new EventEmitter<Cp2020Equipment>();

  @Output()
  update: EventEmitter<Cp2020Equipment> = new EventEmitter<Cp2020Equipment>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.categories$ = this.store.pipe(
      select(cp2020EquipmentCategoriesSelector)
    );
    this.currItem = JSON.parse(JSON.stringify(this.item));
  }

  updateItem(): void {
    this.isEditing = false;
    this.update.emit({ ...this.currItem });
  }
  deleteItem(): void {
    this.delete.emit({ ...this.currItem });
  }
}
