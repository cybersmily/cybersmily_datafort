import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cp2020Credchip } from '../models';

@Component({
    selector: 'cs-cp2020-payment',
    templateUrl: './cp2020-payment.component.html',
    styleUrls: ['./cp2020-payment.component.css'],
    standalone: false
})
export class Cp2020PaymentComponent implements OnInit {

  @Input()
  credchips: Array<Cp2020Credchip> = new Array<Cp2020Credchip>();

  @Input()
  cash: number = 0;

  @Input()
  amountDue: number = 0;

  @Output()
  updateAmounts: EventEmitter<{credchips: Array<Cp2020Credchip>, cash: number, amountDue: number}> = new EventEmitter<{credchips: Array<Cp2020Credchip>, cash: number, amountDue: number}>();

  currCredchips: Array<Cp2020Credchip> = new Array<Cp2020Credchip>();
  currCash: number = 0;
  currAmountDue: number = 0;
  payments: Array<number> = new Array<number>();
  cashPayment: number = 0;

  get totalCredchips(): number {
    return this.currCredchips.reduce((a,b)=> a + b.amount ,0);
  }

  get totalValue(): number {
    return this.currCash + this.totalCredchips;
  }

  get totalPayment(): number {
    return this.cashPayment + this.payments.reduce( (a, b) => a + b, 0);
  }

  constructor() { }

  ngOnInit(): void {
    this.currCash = this.cash;
    this.currCredchips = this.credchips.slice(0);
    this.currAmountDue = this.amountDue;
    this.payments = new Array<number>(this.currCredchips.length).fill(0);
  }

  pay() {
    this.payments.forEach( (pay, i) => {
      this.currCredchips[i].amount -= pay;
    });
    this.currCash -= this.cashPayment;
    this.updateAmounts.emit({
      cash: this.currCash,
      credchips: this.currCredchips,
      amountDue: this.currAmountDue - this.totalPayment
    });
  }

}
