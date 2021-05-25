import { Cp2020Utility, Cp2020Food, Cp2020Housing, Cp2020Lifestyle, Cp2020Identity, Cp2020Credchip } from './../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faTrash, faPen, faRedo, faEuroSign, faList, faCalculator, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-lifestyle',
  templateUrl: './cp2020-lifestyle.component.html',
  styleUrls: ['./cp2020-lifestyle.component.css']
})
export class Cp2020LifestyleComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faRedo = faRedo;
  faEuroSign = faEuroSign;
  faDollarSign = faDollarSign;
  faList = faList;
  faCalculator = faCalculator;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  @Input()
  lifeStyle: Cp2020Lifestyle = {
    credit: new Array<Cp2020Credchip>(4).fill({
       name: 'chip',
      amount: 400,
      writeable: false
    }, 0, 4),
    cash: 40000,
    salary: 2000,
    housing: new Array<Cp2020Housing>(5).fill({
      name: 'test',
      count: 1,
      location: 'Heywood',
      cost: 500,
      quality: 'Moderate',
      qualityMod: 2,
      rooms: 2,
      utilities: new Array<Cp2020Utility>(),
      desc: 'housing description...',
      contents: new Array()
    }, 0, 5),
    food: new Array<Cp2020Food>(2).fill({name: 'Kibble', count: 1, unit: 'week', cost: 50, quality: 'Fair', qualityMod: 1}, 0, 2),
    utilities: new Array<Cp2020Utility>(5).fill({name: 'test', count: 1, unit: 'month', cost: 100}, 0, 5),
    identities: new Array<Cp2020Identity>(3).fill({name: 'test', sin: '', desc: ''}, 0, 3)
  };

  currLifeStyle: Cp2020Lifestyle = {
    credit: new Array<Cp2020Credchip>(),
    cash: 0,
    salary: 0,
    housing: new Array<Cp2020Housing>(),
    food: new Array<Cp2020Food>(),
    utilities: new Array<Cp2020Utility>(),
    identities: new Array<Cp2020Identity>()
  };

  @Output()
  updateLifeStyle: EventEmitter<Cp2020Lifestyle> = new EventEmitter<Cp2020Lifestyle>();

  get totalEb(): number {
    return this.currLifeStyle.cash + this.totalCred;
  }

  get totalCred(): number {
    return this.currLifeStyle.credit.reduce((a,b) => a + b.amount, 0);
  }

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currLifeStyle = JSON.parse(JSON.stringify(this.lifeStyle));
    console.log(this.currLifeStyle.housing);
  }

  updateIdentities(identities: Array<Cp2020Identity>) {
    this.currLifeStyle.identities = identities;
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  updateHosing(housing: Array<Cp2020Housing>) {
    this.currLifeStyle.housing = housing;
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  updateUtilities(utilities: Array<Cp2020Utility>) {
    this.currLifeStyle.utilities = utilities;
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  updateFood(food: Array<Cp2020Food>) {
    this.currLifeStyle.food = food;
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  updateCash(cash: number) {
    this.currLifeStyle.cash = cash;
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  updateCredit(credit: Array<Cp2020Credchip>) {
    this.currLifeStyle.credit = credit.slice(0);
    this.updateLifeStyle.emit(this.currLifeStyle);
  }

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
