import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { JsonDataFiles, DataService } from './../../../services/file-services';
import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Cp2020Expense, Cp2020Payment } from '../models';

@Component({
    selector: 'cs-cp2020-expense-list',
    templateUrl: './cp2020-expense-list.component.html',
    styleUrls: ['./cp2020-expense-list.component.css'],
    standalone: false
})
export class Cp2020ExpenseListComponent implements OnInit, AfterViewInit {
  faEuroSign = faEuroSign;

  expensesList: Array<Cp2020Expense> = new Array<Cp2020Expense>();
  totalCost: number = 0;

  @Input()
  cash: number = 0;

  @Input()
  credit: number = 0;

  @Output()
  payAmount: EventEmitter<number> = new EventEmitter<number>();

  @ViewChildren('expenseCountElem')
  expenseCountInputList: QueryList<ElementRef>;

  get firstColumn(): Array<Cp2020Expense> {
    return this.expensesList.slice(0, Math.ceil(this.expensesList.length/2));
  }

  get secondColumn(): Array<Cp2020Expense> {
    return this.expensesList.slice(Math.ceil(this.expensesList.length/2));
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService
    .GetJson(JsonDataFiles.CP2020_LIFESTYLE_EXPENSES_JSON)
    .subscribe( (data:Array<Cp2020Expense>) => {
      this.expensesList = data;
    });
  }

  ngAfterViewInit(): void {
    this.expenseCountInputList.changes.subscribe(() => {
      if(this.expenseCountInputList.first) {
        this.expenseCountInputList.first.nativeElement.focus();
      }
    });

  }

  calculateCost() {
    this.totalCost = this.expensesList.reduce( (a,b) => a + ((b.count) ? (b.count * b.cost) : 0), 0);
  }

  pay() {
    this.payAmount.emit(this.totalCost);
  }

}
