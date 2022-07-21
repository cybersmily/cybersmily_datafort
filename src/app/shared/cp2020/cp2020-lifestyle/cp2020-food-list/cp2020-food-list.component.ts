import {
  faTrash,
  faPlus,
  faEuroSign,
  faUtensils,
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
import { Cp2020Food } from '../models';

@Component({
  selector: 'cs-cp2020-food-list',
  templateUrl: './cp2020-food-list.component.html',
  styleUrls: ['./cp2020-food-list.component.css'],
})
export class Cp2020FoodListComponent implements OnInit, OnChanges {
  faTrash = faTrash;
  faPlus = faPlus;
  faEuroSign = faEuroSign;
  faUtensils = faUtensils;

  groceries = [
    { name: 'Kibble', cost: 50 },
    { name: 'Generic Prepak', cost: 150 },
    { name: 'Good Prepak', cost: 200 },
    { name: 'Fresh Food', cost: 300 },
    { name: 'Genetically Grown', cost: 500 },
  ];

  qualities = [
    { name: 'Poor', mod: 0.5 },
    { name: 'Fair', mod: 1 },
    { name: 'Good', mod: 2 },
    { name: 'Excellent', mod: 3 },
  ];

  @Input()
  foodList: Array<Cp2020Food> = new Array<Cp2020Food>();

  @Output()
  updateFood: EventEmitter<Array<Cp2020Food>> = new EventEmitter<
    Array<Cp2020Food>
  >();

  @Output()
  pay: EventEmitter<number> = new EventEmitter<number>();

  currFoodList: Array<Cp2020Food> = new Array<Cp2020Food>();

  selectedFood: Cp2020Food = {
    name: this.groceries[0].name,
    count: 1,
    unit: 'week',
    cost: this.groceries[0].cost,
    quality: this.qualities[1].name,
    qualityMod: this.qualities[1].mod,
  };
  selectedType = this.groceries[0];
  selectedQuality = this.qualities[1];

  get totalCost(): number {
    return this.currFoodList.reduce(
      (a, b) => a + (b.count / 7) * b.cost * b.qualityMod,
      0
    );
  }

  constructor() {}

  ngOnInit(): void {
    this.currFoodList = this.foodList.map((food) => {
      const f = new Cp2020Food(food);
      if (f.unit?.toLowerCase().startsWith('week')) {
        f.count = f.count * 7;
        f.unit = 'day';
      }
      return f;
    });
  }

  ngOnChanges(): void {
    this.currFoodList = this.foodList.map((food) => new Cp2020Food(food));
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

  addSelectedFood() {
    const newFood = new Cp2020Food(this.selectedFood);
    newFood.unit = 'day';
    newFood.count = this.selectedFood.count * 7;
    const index = this.currFoodList.findIndex(
      (f) => f.name === newFood.name && f.quality === newFood.quality
    );
    if (index > -1) {
      this.currFoodList[index].count += this.selectedFood.count * 7;
    } else {
      this.currFoodList.push(newFood);
    }
    this.update();
  }

  useFood(index: number) {
    if (index > -1 && index < this.currFoodList.length) {
      this.currFoodList[index].count -= 1;
      this.updateFood.emit(this.currFoodList);
    }
  }
}
