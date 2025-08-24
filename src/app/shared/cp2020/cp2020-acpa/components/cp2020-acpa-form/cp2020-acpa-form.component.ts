import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Cp2020ACPASettings } from './../../enums/cp2020-acpa-settings';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, first, Subject } from 'rxjs';
import {
  faPlus,
  faTrash,
  faRedo,
  faSearch,
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

@Component({
    selector: 'cs-cp2020-acpa-form',
    templateUrl: './cp2020-acpa-form.component.html',
    styleUrls: ['./cp2020-acpa-form.component.css'],
    standalone: false
})
export class Cp2020AcpaFormComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faRedo = faRedo;
  faSearch = faSearch;

  attributeData: AcpaAttributeData = {
    chassis: [],
    armor: [],
    realityInterfaces: [],
    controlSystems: [],
    components: [],
    weapons: [],
    stockDesigns: [],
  };
  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  currACPA$: Observable<Cp2020ACPA>;

  selectedName = '';
  selectedManufacturer = '';
  selectedNote = '';
  selectedChassis = new Cp2020ACPAChassis();
  selectedArmor = new Cp2020AcpaArmor();
  selectedInterface = new Cp2020ACPAComponent();
  selectedControl = new Cp2020ACPAComponent();
  selectedTroopSize = 0;
  notesSubject: Subject<string> = new Subject();

  get filteredArmor(): Array<Cp2020AcpaArmor> {
    return this.attributeData.armor.filter(
      (armor) => armor.sp < this.selectedChassis?.str * 2
    );
  }

  constructor(
    private modalService: BsModalService,
    private attributesService: Cp2020ACPADataAttributesService,
    private acpaBuilderService: Cp2020ACPABuilderService,
    private dataService: DataService
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
    this.notesSubject.pipe(debounceTime(500)).subscribe((note) => {
      this.acpaBuilderService.updateNote(this.selectedNote);
    });
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
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

  updateNote() {
    this.notesSubject.next(this.selectedNote);
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

  loadJSONFile(fileName: string): void {
    this.dataService.GetJson<Cp2020ACPA>(fileName).subscribe((data) => {
      this.acpaBuilderService.update(data);
      this.modalRef.hide();
    });
  }
}
