import { KeyValue } from '@angular/common';
import { Cp2020Housing } from './../models/cp2020-housing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cp2020Services } from '../models/cp2020-services';
import {
  faPlus,
  faTrash,
  faPen,
  faSave,
  faEuroSign,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  OnChanges,
} from '@angular/core';
import { CpHousing } from '../models';

@Component({
  selector: 'cs-cp2020-housing-list',
  templateUrl: './cp2020-housing-list.component.html',
  styleUrls: ['./cp2020-housing-list.component.css'],
})
export class Cp2020HousingListComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  faEuroSign = faEuroSign;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  @Input()
  housingList: Array<CpHousing> = new Array<CpHousing>();

  @Output()
  updateHousing: EventEmitter<Array<CpHousing>> = new EventEmitter<
    Array<CpHousing>
  >();

  @Output()
  payHousing: EventEmitter<number> = new EventEmitter<number>();

  currHousing: Array<Cp2020Housing> = new Array<Cp2020Housing>();
  modalTitle: string = 'Housing';

  utilities: Array<Cp2020Services> = [
    { name: 'Utilities (Elect./Water)', cost: 100, unit: 'month', count: 0 },
    { name: 'Landline', cost: 30, unit: 'month', count: 0 },
    { name: 'Cable TV', cost: 40, unit: 'month', count: 0 },
  ];

  selectedHousing: Cp2020Housing = new Cp2020Housing({
    utilities: this.utilities,
  });

  selectedIndex: number = -1;
  newContent: string = '';
  newUtility: Cp2020Services = { name: '', cost: 0, unit: 'month', count: 0 };

  get totalCost(): number {
    return this.currHousing.reduce((a, b) => a + b.totalCost, 0);
  }

  get contentColOne(): Array<string> {
    return this.selectedHousing.contents.slice(0, this.contentColTwoIndex);
  }

  get contentColTwo(): Array<string> {
    return this.selectedHousing.contents.slice(this.contentColTwoIndex);
  }

  get contentColTwoIndex(): number {
    return Math.ceil(this.selectedHousing.contents.length / 2);
  }

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.currHousing = this.housingList.map(
      (housing) => new Cp2020Housing(housing)
    );
  }

  ngOnChanges(): void {
    this.currHousing = this.housingList.map(
      (housing) => new Cp2020Housing(housing)
    );
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  refreshSelected() {
    this.selectedHousing = new Cp2020Housing({ utilities: this.utilities });
    this.selectedIndex = -1;
  }

  add(template: TemplateRef<any>) {
    this.modalTitle = 'New Housing';
    this.refreshSelected();
    if (template) {
      this.showModal(template);
    }
  }

  addUtility(): void {
    this.selectedHousing.utilities.push(this.newUtility);
    this.newUtility = { name: '', cost: 0, unit: 'month', count: 0 };
  }

  deleteUtility(index: number): void {
    this.selectedHousing.utilities.splice(index, 1);
  }

  addContent() {
    if (this.newContent !== '') {
      this.selectedHousing.contents.push(this.newContent);
      this.newContent = '';
      this.update();
    }
  }

  edit(index: number, template: TemplateRef<any>) {
    this.modalTitle = 'Edit Housing';
    this.selectedHousing = JSON.parse(JSON.stringify(this.currHousing[index]));
    this.selectedIndex = index;
    if (template) {
      this.showModal(template);
    }
  }

  delete(index: number) {
    if (index >= 0) {
      if (index === this.selectedIndex) {
        this.refreshSelected();
      }
      this.currHousing.splice(index, 1);
      this.update();
    }
  }

  deleteContent(index: number) {
    if (index >= 0) {
      this.selectedHousing.contents.splice(index, 1);
      this.update();
    }
  }

  update() {
    this.updateHousing.emit(this.currHousing.slice(0));
  }

  toggleUtility(e, index: number) {
    this.selectedHousing.utilities[index].count =
      this.selectedHousing.utilities[index].count > 0 ? 0 : 1;
  }

  getUtilitySelected(index: number): boolean {
    return this.selectedHousing.utilities[index].count > 0;
  }

  saveHousing() {
    const housing: CpHousing = this.selectedHousing as CpHousing;
    if (
      this.selectedIndex < 0 ||
      this.selectedIndex > this.currHousing.length - 1
    ) {
      this.currHousing.push(new Cp2020Housing(housing));
    } else {
      this.currHousing[this.selectedIndex] = new Cp2020Housing(housing);
    }
    this.update();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  pay(amountDue: number) {
    this.payHousing.emit(amountDue);
  }
}
