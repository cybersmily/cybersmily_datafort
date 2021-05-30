import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Cp2020Services } from '../models/cp2020-services';
import { faPlus, faTrash, faPen, faSave, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Cp2020Housing } from '../models';

@Component({
  selector: 'cs-cp2020-housing-list',
  templateUrl: './cp2020-housing-list.component.html',
  styleUrls: ['./cp2020-housing-list.component.css']
})
export class Cp2020HousingListComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  faEuroSign = faEuroSign;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  @Input()
  housingList: Array<Cp2020Housing> = new Array<Cp2020Housing>();

  @Output()
  updateHousing: EventEmitter<Array<Cp2020Housing>> = new EventEmitter<Array<Cp2020Housing>>();

  @Output()
  payHousing: EventEmitter<number> = new EventEmitter<number>();

  currHousing: Array<Cp2020Housing>  = new Array<Cp2020Housing>();
  modalTitle: string = 'Housing';

  utilities: Array<Cp2020Services> = [
    {name:'Utilities (Elect./Water)', cost:100, unit:'month', count: 0},
    {name:'Landline', cost:30, unit:'month', count: 0},
    {name:'Cable TV', cost:40, unit:'month', count: 0}
  ];

  selectedHousing: Cp2020Housing = {
    name: '',
    count: 1,
    location: '',
    cost: 0,
    quality: '',
    qualityMod: 1,
    rooms: 1,
    utilities: [
      {name:'Utilities (Elect./Water)', cost:100, unit:'month', count: 0},
      {name:'Landline', cost:30, unit:'month', count: 0},
      {name:'Cable TV', cost:40, unit:'month', count: 0}
    ],
    desc: '',
    contents: new Array<string>()
  };
  selectedIndex: number = -1;
  newContent: string = '';

  get totalCost(): number {
    let cost = 0;
    this.currHousing.forEach( h => {
      cost += h.cost * h.rooms * h.qualityMod;
      cost += h.utilities.reduce((a, b) => a +  (b.cost * b.count), 0);
    });
    return cost;
  }

  get contentColOne(): Array<string> {
    return this.selectedHousing.contents.slice(0, this.contentColTwoIndex);
  }

  get contentColTwo(): Array<string> {
    return this.selectedHousing.contents.slice(this.contentColTwoIndex);
  }

  get contentColTwoIndex(): number {
    return Math.ceil(this.selectedHousing.contents.length/2);
  }

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currHousing = this.housingList.slice(0);
  }

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  add(template: TemplateRef<any>) {
    this.modalTitle = 'New Housing';
    this.selectedHousing = {
      name: 'Rental',
      count: 1,
      location: 'Night City',
      cost: 200,
      quality: '',
      qualityMod: 1,
      rooms: 1,
      utilities: [
        {name:'Utilities (Elect./Water)', cost:100, unit:'month', count: 1},
        {name:'Landline', cost:30, unit:'month', count: 0},
        {name:'Cable TV', cost:40, unit:'month', count: 0}
      ],
      desc: '',
      contents: new Array<string>()
    }
    this.selectedIndex = -1;
    this.showModal(template);
  }

  addContent() {
    if (this.newContent !== '') {
      this.selectedHousing.contents.push(this.newContent);
      this.newContent = '';
      this.update();
    }
  }

  edit(index: number,template: TemplateRef<any>) {
    this.modalTitle = 'Edit Housing';
    this.selectedHousing = JSON.parse(JSON.stringify( this.currHousing[index]));
    this.selectedIndex = index;
    this.showModal(template);
  }

  delete(index: number) {
    this.currHousing.splice(index, 1);
    this.update();
  }

  deleteContent(index: number) {
    this.selectedHousing.contents.splice(index, 1);
    this.update();
  }

  update() {
    this.updateHousing.emit(this.currHousing.slice(0));
  }

  toogleUtility(e, index: number) {
    this.selectedHousing.utilities[index].count = (this.selectedHousing.utilities[index].count > 0) ? 0 : 1;
  }

  getCost(housing: Cp2020Housing): number {
    let cost = housing.rooms * housing.cost * housing.qualityMod;
    cost += housing.utilities.reduce((a,b)=>a + (b.cost * b.count), 0);
    return cost;
  }

  getUtilitySelected(index: number): boolean {
    return (this.selectedHousing.utilities[index].count > 0);
  }

  saveHousing() {
    const housing: Cp2020Housing = JSON.parse(JSON.stringify(this.selectedHousing));
    if (this.selectedIndex < 0) {
      this.currHousing.push(housing);
    } else {
      this.currHousing[this.selectedIndex] = housing;
    }
    this.update();
    this.modalRef.hide();
  }

  pay(amountDue: number) {
    this.payHousing.emit(amountDue);
  }

}
