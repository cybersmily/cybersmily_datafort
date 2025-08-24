import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ACPAEnclosure } from './../../enums/acpa-enclossure';
import { Cp2020ACPAWeapon } from './../../models/cp2020-acpa-weapon';
import { Cp2020ACPAComponent } from './../../models/cp2020-acpa-component';
import { map } from 'rxjs/operators';
import { Cp2020ACPABuilderService } from './../../services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cs-cp2020-acpa-carried-editor',
    templateUrl: './cp2020-acpa-carried-editor.component.html',
    styleUrls: ['./cp2020-acpa-carried-editor.component.css'],
    standalone: false
})
export class Cp2020AcpaCarriedEditorComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  carriedEquipment$: Observable<Array<any>>;
  selectedLocation = 'handed';
  availableSpaces = 0;
  selectedEnclosure: ACPAEnclosure = ACPAEnclosure.carried;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  @Input()
  isDisabled: boolean = false;

  constructor(
    private acpaBuilderService: Cp2020ACPABuilderService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.carriedEquipment$ = this.acpaBuilderService.acpa.pipe(
      map((acpa) => acpa.equipment)
    );
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  addEquipment(equip: Cp2020ACPAWeapon | Cp2020ACPAComponent) {
    const type = this.selectedEnclosure;
    this.acpaBuilderService.addEquipment(this.selectedLocation, type, equip);
    this.modalRef.hide();
  }

  removeCarriedComponent(index: number) {
    this.acpaBuilderService.removeCarriedEquipment(index);
  }

  getEquipmentColumnOne(
    equipment: Array<any>
  ): Array<Cp2020ACPAComponent | Cp2020ACPAWeapon> {
    const count = Math.ceil(equipment.length / 2);
    return equipment.slice(0, count);
  }

  getHands(locations: string): string {
    if (!locations || !locations.includes('handed')) {
      return '';
    }
    return locations.split('|').filter((loc) => loc.includes('handed'))[0];
  }

  getEquipmentColumnTwo(
    equipment: Array<any>
  ): Array<Cp2020ACPAComponent | Cp2020ACPAWeapon> {
    const count = Math.ceil(equipment.length / 2);
    return equipment.slice(count);
  }

  getWeight(wt: number): number {
    return this.acpaBuilderService.calculateItemWeight(wt);
  }
}
