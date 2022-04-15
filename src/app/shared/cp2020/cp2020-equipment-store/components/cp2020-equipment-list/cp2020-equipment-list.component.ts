import { map } from 'rxjs/operators';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { SaveFileService } from './../../../../services/file-services/save-file/save-file.service';
import {
  LoadCp2020EquipmentAction,
  UpdateCp2020EquipmentAction,
  RemoveCp2020EquipmentAction,
} from './../../actions/cp2020-equipment.actions';
import {
  cp2020EquipmentStoreSelector,
  cp2020EquipmentCategoriesSelector,
} from './../../selectors/cp2020-equipment-store-selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Cp2020Equipment } from '../../models';

@Component({
  selector: 'cs-cp2020-equipment-list',
  templateUrl: './cp2020-equipment-list.component.html',
  styleUrls: ['./cp2020-equipment-list.component.css'],
})
export class Cp2020EquipmentListComponent implements OnInit {
  faSave = faSave;
  gearList$: Observable<Array<Cp2020Equipment>>;
  categoryList$: Observable<Array<string>>;
  filters = {
    category: '',
    name: '',
    source: '',
  };

  @Input()
  isEditable: boolean = false;

  constructor(private store: Store, private savefile: SaveFileService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.store.dispatch(LoadCp2020EquipmentAction(null));
    this.gearList$ = this.store.pipe(select(cp2020EquipmentStoreSelector));
    this.categoryList$ = this.store.pipe(
      select(cp2020EquipmentCategoriesSelector)
    );
  }

  update($event: Cp2020Equipment): void {
    this.store.dispatch(UpdateCp2020EquipmentAction($event));
  }
  delete($event: Cp2020Equipment): void {
    this.store.dispatch(RemoveCp2020EquipmentAction($event));
  }

  save() {
    this.gearList$
      .subscribe((data) => {
        this.savefile.SaveAsFile('cp2020equipment', data, 'json');
      })
      .unsubscribe();
  }
}
