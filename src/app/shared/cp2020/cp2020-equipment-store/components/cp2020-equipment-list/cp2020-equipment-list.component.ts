import { LoadCp2020EquipmentAction } from './../../actions/cp2020-equipment.actions';
import { cp2020EquipmentStoreSelector, cp2020EquipmentCategoriesSelector } from './../../selectors/cp2020-equipment-store-selector';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Cp2020Equipment } from '../../models';

@Component({
  selector: 'cs-cp2020-equipment-list',
  templateUrl: './cp2020-equipment-list.component.html',
  styleUrls: ['./cp2020-equipment-list.component.css']
})
export class Cp2020EquipmentListComponent implements OnInit {

  gearList$: Observable<Array<Cp2020Equipment>>;
  categoryList$: Observable<Array<string>>;
  filters = {
    category: '',
    name: '',
    source: ''
  }


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.store.dispatch(LoadCp2020EquipmentAction(null));
    this.gearList$ = this.store.pipe(
      select(cp2020EquipmentStoreSelector)
    );
    this.categoryList$ = this.store.pipe(
      select(cp2020EquipmentCategoriesSelector)
    );

  }

}
