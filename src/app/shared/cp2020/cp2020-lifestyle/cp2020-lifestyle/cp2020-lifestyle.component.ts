import { Cp2020Services, Cp2020Food, Cp2020Housing, Cp2020Lifestyle, Cp2020Identity, Cp2020Credchip, Cp2020Payment } from './../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faTrash, faPen, faRedo, faEuroSign, faList, faCalculator, faDollarSign,  faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, TemplateRef, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-cp2020-lifestyle',
  templateUrl: './cp2020-lifestyle.component.html',
  styleUrls: ['./cp2020-lifestyle.component.css']
})
export class Cp2020LifestyleComponent implements OnInit, OnChanges {
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faRedo = faRedo;
  faEuroSign = faEuroSign;
  faDollarSign = faDollarSign;
  faList = faList;
  faCalculator = faCalculator;
  faQuestionCircle = faQuestionCircle;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  @Input()
  lifeStyle: Cp2020Lifestyle =  {
    credchips: new Array<Cp2020Credchip>(),
    cash: 0,
    debt: 0,
    salary: 0,
    housing: new Array<Cp2020Housing>(),
    food: new Array<Cp2020Food>(),
    services: new Array<Cp2020Services>(),
    identities: new Array<Cp2020Identity>()
  };

  @Output()
  updateLifeStyle: EventEmitter<Cp2020Lifestyle> = new EventEmitter<Cp2020Lifestyle>();

  currLifeStyle: Cp2020Lifestyle = {
    credchips: new Array<Cp2020Credchip>(),
    cash: 0,
    debt: 0,
    salary: 0,
    housing: new Array<Cp2020Housing>(),
    food: new Array<Cp2020Food>(),
    services: new Array<Cp2020Services>(),
    identities: new Array<Cp2020Identity>()
  };

  get totalEb(): number {
    return this.currLifeStyle.cash + this.totalCred;
  }

  get totalCred(): number {
    return this.currLifeStyle.credchips.reduce((a,b) => a + b.amount, 0);
  }

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currLifeStyle = JSON.parse(JSON.stringify(this.lifeStyle));
  }

  ngOnChanges(): void {
    this.currLifeStyle = JSON.parse(JSON.stringify(this.lifeStyle));
  }

  updateIdentities(identities: Array<Cp2020Identity>) {
    this.currLifeStyle.identities = identities;
    this.update();
  }

  updateHousing(housing: Array<Cp2020Housing>) {
    this.currLifeStyle.housing = housing;
    this.update();
  }

  updateServices(services: Array<Cp2020Services>) {
    this.currLifeStyle.services = services;
    this.update();
  }

  updateFood(food: Array<Cp2020Food>) {
    this.currLifeStyle.food = food;
    this.update();
  }

  updateCredchips(credit: Array<Cp2020Credchip>) {
    this.currLifeStyle.credchips = credit.slice(0);
    this.update();
  }

  update() {
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  updateAmounts(amounts: {credchips: Array<Cp2020Credchip>, cash: number, amountDue: number}) {
    this.modalRef.hide();
    this.currLifeStyle.cash = amounts.cash;
    this.currLifeStyle.credchips = amounts.credchips.slice(0);
    this.currLifeStyle.debt = amounts.amountDue;
    this.update();
  }

  pay(amount: number, template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.currLifeStyle.debt += amount;
    this.showModal(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
