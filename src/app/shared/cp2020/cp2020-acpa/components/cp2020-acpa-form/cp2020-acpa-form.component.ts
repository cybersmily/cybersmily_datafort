import { Cp2020ACPASettings } from './../../enums/cp2020-acpa-settings';
import { map, switchMap } from 'rxjs/operators';
import { Observable, first } from 'rxjs';
import { SaveFileService } from '../../../../services/file-services/save-file/save-file.service';
import { FileLoaderService } from '../../../../services/file-services/file-loader/file-loader.service';
import { ACPAEnclosure } from '../../enums/acpa-enclossure';
import { Cp2020ACPAWeapon } from '../../models/cp2020-acpa-weapon';
import {
  faPlus,
  faTrash,
  faFilePdf,
  faRedo,
  faFile,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020ACPAComponent } from '../../models/cp2020-acpa-component';
import { Cp2020AcpaArmor } from '../../models/cp2020-acpa-armor';
import { Cp2020ACPAChassis } from '../../models/cp2020-acpa-chassis';
import { Cp2020ACPABuilderService } from '../../services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { Cp2020ACPA, ACPA } from '../../models';
import { Cp2020ACPADataAttributesService } from '../../services/cp2020-acpa-data-attrbutes/cp2020-acpa-data-attributes.service';
import { AcpaAttributeData } from '../../models/acpa-attribute-data';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020ACPALocation } from '../../models/cp2020-acpa-location';

@Component({
  selector: 'cs-cp2020-acpa-form',
  templateUrl: './cp2020-acpa-form.component.html',
  styleUrls: ['./cp2020-acpa-form.component.css'],
})
export class Cp2020AcpaFormComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faRedo = faRedo;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  attributeData: AcpaAttributeData = {
    chassis: [],
    armor: [],
    realityInterfaces: [],
    controlSystems: [],
    components: [],
    weapons: [],
  };

  // currACPA = new Cp2020ACPA();
  currACPA$: Observable<Cp2020ACPA>;

  selectedName = '';
  selectedManufacturer = '';
  selectedNote = '';
  selectedChassis = new Cp2020ACPAChassis();
  selectedArmor = new Cp2020AcpaArmor();
  selectedInterface = new Cp2020ACPAComponent();
  selectedControl = new Cp2020ACPAComponent();
  selectedTroopSize = 0;
  selectedComponentCat = 'x';
  selectedComponent = new Cp2020ACPAComponent();
  selectedWeaponCat = 'x';

  get filteredArmor(): Array<Cp2020AcpaArmor> {
    return this.attributeData.armor.filter(
      (armor) => armor.sp < this.selectedChassis?.str * 2
    );
  }

  constructor(
    private attributesService: Cp2020ACPADataAttributesService,
    private acpaBuilderService: Cp2020ACPABuilderService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.currACPA$ = this.attributesService.getData().pipe(
      first(),
      map((data) => {
        this.attributeData = data;
      }),
      switchMap((data) =>
        this.acpaBuilderService.acpa.pipe(
          map((acpa: ACPA) => {
            return this.setVariables(new Cp2020ACPA(acpa));
          })
        )
      )
    );
  }

  private setVariables(acpa: Cp2020ACPA): Cp2020ACPA {
    const index = this.attributeData.chassis.findIndex(
      (chassis) =>
        acpa.chassis?.str === chassis?.str &&
        acpa.chassis?.name === chassis?.name
    );
    this.selectedChassis = this.attributeData.chassis[index];
    this.selectedArmor = this.attributeData.armor.find(
      (armor) => armor.sp === acpa.armor.sp
    );
    this.selectedInterface = this.attributeData.realityInterfaces.find(
      (intrfc) => intrfc.name === acpa.realityInterface.name
    );
    this.selectedControl = this.attributeData.controlSystems.find(
      (control) => control.name === acpa.controlSystem.name
    );
    this.selectedTroopSize = acpa.trooperSize;
    this.selectedManufacturer = acpa.manufacturer;
    this.selectedName = acpa.name;
    this.selectedNote = acpa.notes;
    return acpa;
  }

  updateChassis() {
    this.acpaBuilderService.updateChassis(this.selectedChassis);
  }

  updateArmor() {
    this.acpaBuilderService.updateArmor(this.selectedArmor);
  }

  updateInterface() {
    this.acpaBuilderService.updateInterface(this.selectedInterface);
  }
  updateControl() {
    this.acpaBuilderService.updateControlSystem(this.selectedControl);
  }

  updateTroopSize() {
    this.acpaBuilderService.updateTroopSize(this.selectedTroopSize);
  }

  updateName() {
    this.acpaBuilderService.updateName(this.selectedName);
  }

  updateManufacturer() {
    this.acpaBuilderService.updateManufacturer(this.selectedManufacturer);
  }

  updateLocations(acpa: Cp2020ACPA) {
    this.acpaBuilderService.setLocations(acpa, acpa.chassis);
  }

  updateNote() {
    this.acpaBuilderService.updateNote(this.selectedNote);
  }

  toggleWad() {
    this.acpaBuilderService.toggleWad();
  }

  updateMA(ma: number) {
    this.acpaBuilderService.updateMA(ma);
  }

  reset() {
    this.acpaBuilderService.update(new Cp2020ACPA());
    this.selectedChassis = null;
    this.selectedArmor = null;
    this.selectedInterface = null;
    this.selectedControl = null;
    this.selectedTroopSize = Cp2020ACPASettings.TROOPSIZE_DEFAULT.valueOf();
    this.selectedManufacturer = '';
    this.selectedName = '';
    this.selectedNote = '';
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  showLocationChoice(
    component: Cp2020ACPAComponent,
    template: TemplateRef<any>
  ) {
    this.selectedComponent = component;
    this.showModal(template);
  }

  getWeight(wt: number): number {
    return this.acpaBuilderService.calculateItemWeight(wt);
  }

  getHands(locations: string): string {
    if (!locations || !locations.includes('handed')) {
      return '';
    }
    return locations.split('|').filter((loc) => loc.includes('handed'))[0];
  }

  getLocations(locations: string): Array<string> {
    const loc = [];
    if (locations === null) {
      return loc;
    }
    if (locations.includes('head') || locations.includes('any')) {
      loc.push('head');
    }
    if (locations.includes('torso') || locations.includes('any')) {
      loc.push('torso');
    }
    if (locations.includes('arms') || locations.includes('any')) {
      loc.push('r arm');
      loc.push('l arm');
    }
    if (locations.includes('legs') || locations.includes('any')) {
      loc.push('r leg');
      loc.push('l leg');
    }
    return loc;
  }
}
