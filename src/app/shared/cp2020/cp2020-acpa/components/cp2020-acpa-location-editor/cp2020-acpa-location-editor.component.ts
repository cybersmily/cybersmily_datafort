import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cp2020ACPABuilderService } from './../../services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ACPAEnclosure } from './../../enums/acpa-enclossure';
import {
  Cp2020ACPAWeapon,
  Cp2020ACPAComponent,
  AcpaAttributeData,
  Cp2020ACPALocations,
} from './../../models';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-acpa-location-editor',
  templateUrl: './cp2020-acpa-location-editor.component.html',
  styleUrls: ['./cp2020-acpa-location-editor.component.css'],
})
export class Cp2020AcpaLocationEditorComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;

  acpalocations$: Observable<Cp2020ACPALocations>;

  @Input()
  attributeData: AcpaAttributeData;

  @Input()
  isDisabled: boolean = false;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };
  locations: Array<any>;

  selectedLocation = '';
  availableSpaces = 0;
  selectedEnclosure: ACPAEnclosure = ACPAEnclosure.internal;
  selectedIndex = null;

  ACPAEnclosure = ACPAEnclosure;
  isWad = false;

  constructor(
    private modalService: BsModalService,
    private acpaBuilderService: Cp2020ACPABuilderService
  ) {}

  ngOnInit(): void {
    this.acpalocations$ = this.acpaBuilderService.acpa.pipe(
      map((acpa) => {
        this.locations = this.getLocationEntries(acpa.locations);
        this.isWad = acpa.isWad;
        return acpa.locations;
      })
    );
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  formatTitle(name: string, index?: number): string {
    if (index == 0 || index == 1) {
      const sides = ['r', 'l'];
      return `${sides[index]} ${name.replace(/s+$/, '')}`;
    } else if (index > 1) {
      return `Extra ${name.replace(/s+$/, '')} ${index - 1}`;
    }
    return name;
  }

  getLocationEntries(acpaLocations: Cp2020ACPALocations): Array<any> {
    const locations = Object.entries(acpaLocations).map((entry) => ({
      title: entry[0],
      location: entry[1],
    }));
    return [...locations];
  }

  showEquipment(
    location: string,
    availableSpaces: number,
    enclosure: ACPAEnclosure,
    template: TemplateRef<any>,
    index?: number
  ) {
    this.selectedEnclosure = enclosure;
    this.selectedLocation = location?.toLocaleLowerCase();
    this.availableSpaces = availableSpaces * 4;
    this.selectedIndex = index;
    this.showModal(template);
  }

  addEquipment(equip: Cp2020ACPAWeapon | Cp2020ACPAComponent) {
    const type = this.selectedEnclosure;
    this.acpaBuilderService.addEquipment(
      this.selectedLocation,
      type,
      equip,
      this.selectedIndex
    );
    this.modalRef.hide();
  }

  removeEquipment(
    location: string,
    type: ACPAEnclosure,
    equip: Cp2020ACPAWeapon | Cp2020ACPAComponent,
    index: number
  ) {
    this.acpaBuilderService.removeEquipment(
      location.toLowerCase().replace(' ', ''),
      type,
      equip,
      index
    );
  }

  nameIsCollection(name: string): boolean {
    return name?.startsWith('(');
  }

  addLimb(locationName: string): void {
    this.acpaBuilderService.addNewLimb(locationName);
  }

  removeLimb(locationName: string, index: number): void {
    this.acpaBuilderService.removeLimb(locationName, index);
  }
}
