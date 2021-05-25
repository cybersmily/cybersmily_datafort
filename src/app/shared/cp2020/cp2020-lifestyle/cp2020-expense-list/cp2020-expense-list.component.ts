import { JsonDataFiles, DataService } from './../../../services/file-services';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cp2020Expense, Cp2020Payment } from '../models';

@Component({
  selector: 'cs-cp2020-expense-list',
  templateUrl: './cp2020-expense-list.component.html',
  styleUrls: ['./cp2020-expense-list.component.css']
})
export class Cp2020ExpenseListComponent implements OnInit {

  expensesList: Array<Cp2020Expense> = new Array<Cp2020Expense>();
  totalCost: number = 0;

  @Input()
  cash: number = 0;

  @Input()
  credit: number = 0;

  @Output()
  pay: EventEmitter<Cp2020Payment> = new EventEmitter<Cp2020Payment>();

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

  calculateCost() {
    this.totalCost = this.expensesList.reduce( (a,b) => a + ((b.count) ? (b.count * b.cost) : 0), 0);
  }

  payCash() {
    this.pay.emit({amount: this.totalCost, type: 'cash'});
  }

  payCredit() {
    this.pay.emit({amount: this.totalCost, type: 'cred'});
  }

}
