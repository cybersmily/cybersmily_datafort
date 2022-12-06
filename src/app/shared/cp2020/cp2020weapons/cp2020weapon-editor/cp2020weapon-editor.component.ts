import { DataListColumnParameters } from './../../../modules/data-list/models/data-list-parameters';
import { RandomWeaponGeneratorService } from './../services/random-weapon-generator/random-weapon-generator.service';
import { DataWeapon } from './../models/data-weapon';
import { Cp2020WeaponMagazine } from './../models/cp-2020-weapon-magazine';
import { CpPlayerWeaponOption } from './../models/cp-player-weapon-option';
import { WeaponDataService } from './../services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  faSave,
  faPen,
  faPlus,
  faTrash,
  faRedo,
  faSearch,
  faDice,
} from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon, WeaponProperties } from './../models';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-editor',
  templateUrl: './cp2020weapon-editor.component.html',
  styleUrls: ['./cp2020weapon-editor.component.css'],
})
export class Cp2020weaponEditorComponent implements OnInit, AfterViewInit {
  faSave = faSave;
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;
  faRedo = faRedo;
  faSearch = faSearch;
  faDice = faDice;

  weaponTypes = WeaponProperties.types;
  availabilities = WeaponProperties.availabilities;
  concealments = WeaponProperties.concealments;
  reliabilites = WeaponProperties.reliabilites;
  newWeapon: CpPlayerWeapon;
  oldWeapon: CpPlayerWeapon;
  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-xl',
  };

  columns: Array<DataListColumnParameters> = [
    {
      header: 'category',
      headerClass: 'col-2 d-none d-md-inline-block text-xsmall p-0',
      property: 'category',
      filters: 'filter',
      filterValues: WeaponProperties.categories.map((cat) => ({
        key: cat,
        value: cat,
      })),
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block text-xsmall',
      sort: 'category',
    },
    {
      header: 'sub cat',
      headerClass: 'col-1 d-none d-md-inline-block text-xsmall p-0',
      property: 'subcategory',
      filters: 'contains',
      inputType: 'text',
      class: 'col-1 d-none d-md-inline-block text-xsmall',
      sort: 'subcategory',
    },
    {
      header: 'name',
      headerClass: 'col-3 col-md-2 text-xsmall p-0',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 col-md-2 text-xsmall',
      sort: 'name',
    },
    {
      header: 'type',
      headerClass: 'col text-xsmall text-center p-0',
      property: 'type',
      filters: 'filter',
      filterValues: WeaponProperties.types.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col text-xsmall text-center',
      sort: 'type',
    },
    {
      header: 'wa',
      headerClass: 'col text-xsmall text-center p-0',
      property: 'wa',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-xsmall text-center',
      sort: 'wa',
    },
    {
      header: 'conc.',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center p-0',
      property: 'conc',
      filters: 'filter',
      filterValues: WeaponProperties.concealments.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'conc',
    },
    {
      header: 'avail.',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center p-0',
      property: 'avail',
      filters: 'filter',
      filterValues: WeaponProperties.availabilities.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'avail',
    },
    {
      header: 'dmg',
      headerClass: 'col text-xsmall p-0',
      property: 'damage',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-xsmall',
      sort: 'damage',
    },
    {
      header: 'Shots',
      headerClass: 'col text-xsmall p-0',
      property: 'shots',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-xsmall',
      sort: 'shots',
    },
    {
      header: 'rof',
      headerClass: 'col text-xsmall p-0',
      property: 'rof',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-xsmall',
      sort: 'rof',
    },
    {
      header: 'cost',
      headerClass: 'col text-xsmall p-0',
      property: 'cost',
      filters: null,
      inputType: 'number',
      class: 'col text-small',
      sort: 'cost',
    },
    {
      header: 'rel.',
      headerClass: 'col text-xsmall text-center p-0',
      property: 'rel',
      filters: 'filter',
      filterValues: WeaponProperties.reliabilites.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col text-xsmall text-center',
      sort: 'rel',
    },
    {
      header: 'source',
      headerClass: 'col-2 d-none d-md-inline-block text-xsmall p-0',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  weaponDataList = new Array<DataWeapon>();

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Output()
  updateWeapon: EventEmitter<CpPlayerWeapon> =
    new EventEmitter<CpPlayerWeapon>();

  @ViewChild('newWeaponNameElem', { static: false })
  newWpnElem: ElementRef;

  constructor(
    private modalService: BsModalService,
    private weaponData: WeaponDataService,
    private randomWeaponService: RandomWeaponGeneratorService
  ) {}

  ngOnInit(): void {
    this.newWeapon = new CpPlayerWeapon(this.weapon);
    this.oldWeapon = new CpPlayerWeapon(this.weapon);
    this.weaponData.WeaponList.subscribe((data) => {
      this.weaponDataList = data;
    });
  }

  ngAfterViewInit(): void {
    this.newWpnElem.nativeElement.focus();
  }

  update() {
    if (this.newWeapon.name && this.newWeapon.name !== '') {
      this.updateWeapon.emit(this.newWeapon);
      this.newWeapon = new CpPlayerWeapon();
    }
  }

  updateOptions(options: Array<CpPlayerWeaponOption>) {
    this.newWeapon.options = new Array(...options);
  }

  selectWeapon(weapon: DataWeapon): void {
    this.newWeapon = new CpPlayerWeapon(weapon);
    this.closeModal();
  }

  updateMagazines(magazines: Array<Cp2020WeaponMagazine>) {
    this.newWeapon.magazines = magazines;
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  setDetails(): void {
    const index = this.weaponDataList.findIndex(
      (wpn) => wpn.name === this.newWeapon.name
    );
    if (index > -1) {
      this.newWeapon = new CpPlayerWeapon(this.weaponDataList[index]);
    }
  }

  refresh(): void {
    this.newWeapon = new CpPlayerWeapon(this.oldWeapon);
  }

  generate(): void {
    this.randomWeaponService.generate().subscribe((weapon) => {
      this.newWeapon = new CpPlayerWeapon(weapon);
    });
  }
}
