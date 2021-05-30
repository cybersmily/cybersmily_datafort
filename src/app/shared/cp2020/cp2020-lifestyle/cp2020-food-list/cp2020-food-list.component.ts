import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faTrash, faPlus, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { Cp2020Food } from '../models';

@Component({
  selector: 'cs-cp2020-food-list',
  templateUrl: './cp2020-food-list.component.html',
  styleUrls: ['./cp2020-food-list.component.css']
})
export class Cp2020FoodListComponent implements OnInit, OnChanges {
  faTrash = faTrash;
  faPlus = faPlus;
  faEuroSign = faEuroSign;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  groceries = [
    {name: 'Kibble', cost: 50},
    {name: 'Generic Prepak', cost: 150},
    {name: 'Good Prepak', cost: 200},
    {name: 'Fresh Food', cost: 300},
    {name: 'Genetically Grown', cost: 500}
  ];

  qualities = [
    {name: 'Poor', mod: 0.5},
    {name: 'Fair', mod: 1},
    {name: 'Good', mod: 2},
    {name: 'Excellent', mod: 3}
  ]

  @Input()
  foodList: Array<Cp2020Food> = new Array<Cp2020Food>();

  @Output()
  updateFood: EventEmitter<Array<Cp2020Food>> = new EventEmitter<Array<Cp2020Food>>();

  @Output()
  pay: EventEmitter<number> = new EventEmitter<number>();

  currFoodList: Array<Cp2020Food> = new Array<Cp2020Food>();

  selectedFood: Cp2020Food = {name: this.groceries[0].name, count: 1, unit: 'week', cost: this.groceries[0].cost, quality: this.qualities[1].name, qualityMod: this.qualities[1].mod};
  selectedType = this.groceries[0];
  selectedQuality = this.qualities[1];

  get totalCost(): number {
    return this.currFoodList.reduce((a,b) => a + (b.count * b.cost * b.qualityMod), 0);
  }

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currFoodList = JSON.parse(JSON.stringify(this.foodList));
  }

  ngOnChanges(): void {
    this.currFoodList = JSON.parse(JSON.stringify(this.foodList));
  }

  delete(index: number) {
    this.currFoodList.splice(index, 1);
    this.updateFood.emit(this.currFoodList);
  }

  update() {
    this.updateFood.emit(this.currFoodList);
  }

  changeFood() {
    this.selectedFood.name = this.selectedType.name;
    this.selectedFood.cost = this.selectedType.cost;
  }

  changeQuality() {
    this.selectedFood.qualityMod = this.selectedQuality.mod;
    this.selectedFood.quality = this.selectedQuality.name;
  }

  closeModal() {
    this.modalRef.hide();
  }

  add() {
    const index = this.currFoodList.findIndex( f => f.name === this.selectedType.name && f.quality === this.selectedQuality.name);
    if (index > -1) {
      this.currFoodList[index].count += this.selectedFood.count;
    } else {
      this.currFoodList.push(JSON.parse(JSON.stringify(this.selectedFood)));
    }
    this.updateFood.emit(this.currFoodList);
    this.pay.emit(this.selectedFood.count * this.selectedFood.cost * this.selectedFood.qualityMod);
    this.closeModal();
  }

  openNewModal(template: TemplateRef<any>) {
    this.selectedFood = {name: this.groceries[0].name, count: 1, unit: 'week', cost: this.groceries[0].cost, quality: this.qualities[1].name, qualityMod: this.qualities[1].mod};
    this.selectedQuality = this.qualities[1];
    this.selectedType = this.groceries[0];
    this.modalRef = this.modalService.show(template, this.config);
  }


}
