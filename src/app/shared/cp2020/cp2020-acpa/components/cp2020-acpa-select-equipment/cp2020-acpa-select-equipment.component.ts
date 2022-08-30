import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cp2020ACPADataAttributesService } from './../../services/cp2020-acpa-data-attrbutes/cp2020-acpa-data-attributes.service';
import { ACPAEnclosure } from './../../enums/acpa-enclossure';
import { Cp2020ACPAWeapon, Cp2020ACPAComponent } from '../../models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-select-equipment',
  templateUrl: './cp2020-acpa-select-equipment.component.html',
  styleUrls: ['./cp2020-acpa-select-equipment.component.css'],
})
export class Cp2020AcpaSelectEquipmentComponent implements OnInit {
  weaponCategories$: Observable<Array<string>>;
  weaponList$: Observable<Array<Cp2020ACPAWeapon>>;

  componentCategories$: Observable<Array<string>>;
  componentList$: Observable<Array<Cp2020ACPAComponent>>;

  selectedOption = { type: '', category: '' };

  @Input()
  location = '';

  @Input()
  enclosureType: ACPAEnclosure = ACPAEnclosure.internal;

  @Input()
  availableSpaces: number;

  @Output()
  chooseEquipment = new EventEmitter<Cp2020ACPAWeapon | Cp2020ACPAComponent>();

  constructor(private acpaDataService: Cp2020ACPADataAttributesService) {}

  ngOnInit(): void {
    this.weaponCategories$ = this.acpaDataService
      .getData()
      .pipe(
        map((data) =>
          data.weapons
            .map((wpn) => wpn.category)
            .filter((value, index, self) => self.indexOf(value) === index)
        )
      );
    this.componentCategories$ = this.acpaDataService
      .getData()
      .pipe(
        map((data) =>
          data.components
            .map((comp) => comp.category)
            .filter((value, index, self) => self.indexOf(value) === index)
        )
      );
    this.componentList$ = this.acpaDataService
      .getData()
      .pipe(map((data) => this.filterComponents(data.components)));
    this.weaponList$ = this.acpaDataService
      .getData()
      .pipe(map((data) => this.filterWeapons(data.weapons)));
  }

  filterWeapons(list: Array<Cp2020ACPAWeapon>): Array<Cp2020ACPAWeapon> {
    return this.filterList(list) as Array<Cp2020ACPAWeapon>;
  }

  filterComponents(
    list: Array<Cp2020ACPAComponent>
  ): Array<Cp2020ACPAComponent> {
    return this.filterList(list) as Array<Cp2020ACPAComponent>;
  }

  filterList(
    list: Array<Cp2020ACPAComponent | Cp2020ACPAWeapon>
  ): Array<Cp2020ACPAComponent | Cp2020ACPAWeapon> {
    const location = this.location.includes('arm')
      ? 'arm'
      : this.location.includes('leg')
      ? 'leg'
      : this.location;
    let results = new Array<Cp2020ACPAWeapon | Cp2020ACPAComponent>();
    switch (this.enclosureType) {
      case ACPAEnclosure.internal:
        results = list.filter(
          (item) =>
            (item?.internal?.includes(location) ||
              item?.internal?.includes('any')) &&
            item.spaces > 0 &&
            item.spaces <= this.availableSpaces
        );
        break;
      case ACPAEnclosure.external:
        results = list.filter(
          (item) =>
            (item?.external?.includes(location) ||
              item?.external?.includes('any')) &&
            item.spaces > 0 &&
            item.spaces <= this.availableSpaces
        );
        break;
      case ACPAEnclosure.carried:
        results = list.filter(
          (item) =>
            item?.external?.includes('handed') ||
            item?.external?.includes('any') ||
            item.spaces === 0
        );
        break;
    }
    return results;
  }

  selectEquipment(equip: Cp2020ACPAComponent | Cp2020ACPAWeapon) {
    this.chooseEquipment.emit(equip);
  }
}
