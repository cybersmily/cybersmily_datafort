import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020PlayerCyber, DataCyberware } from './../models';
import { faSave, faTrash, faPlus, faDice } from '@fortawesome/free-solid-svg-icons';
import { CyberDataService } from './../services';
import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberware-selector',
  templateUrl: './cp2020-cyberware-selector.component.html',
  styleUrls: ['./cp2020-cyberware-selector.component.css']
})
export class Cp2020CyberwareSelectorComponent implements OnInit, AfterViewInit {
  faSave = faSave;
  faTrash = faTrash;
  faPlus = faPlus;
  faDice = faDice;

  dataCyber: Array<Cp2020PlayerCyber> = new Array<Cp2020PlayerCyber>();
  filteredDataCyber: Array<DataCyberware> = new Array<DataCyberware>();
  searchFilter = {name: '', type: '', subtype: ''};
  selectedCyber: DataCyberware = new DataCyberware();

  cart: Array<Cp2020PlayerCyber> = new Array<Cp2020PlayerCyber>();

  @Output()
  addCyberware: EventEmitter<Array<Cp2020PlayerCyber>> = new EventEmitter<Array<Cp2020PlayerCyber>>();

  @ViewChild('cyberSearchElem', {static: false})
  cyberSearchInput: ElementRef;

  get totalHumanityLose(): number {
    return this.cart.reduce( (a, b) =>  a + ((b.hl && !isNaN(b.hl)) ? b.hl : 0), 0);
  }

  get totalCost(): number {
    return this.cart.reduce( (a, b) => a + b.cost, 0);
  }

  constructor(private cyberDataService: CyberDataService, private diceService: DiceService) { }

  ngOnInit(): void {
    this.cyberDataService
    .cp2020CyberwareList.subscribe( data => {
      this.dataCyber = data;
      this.filteredDataCyber = data;
    });
  }

  ngAfterViewInit(): void {
      this.cyberSearchInput.nativeElement.focus();
  }

  setSelected(cyber: DataCyberware) {
    this.selectedCyber = cyber;
  }

  add(cyber: DataCyberware) {
    const found = this.cart.findIndex( c => c.name?.toLowerCase() === cyber.name?.toLowerCase());
    if ( found < 0) {
      this.cart.push(new Cp2020PlayerCyber(cyber));
      this.cart = this.cart.slice();
    }
  }

  delete(index: number) {
    this.cart.splice(index, 1);
    this.cart = this.cart.slice();
    this.cyberSearchInput.nativeElement.focus();
  }

  rollHumanityLose(index: number, dice: string) {
    const roll = this.diceService.rollMoreDice(dice);
    this.cart[index].hl = roll.total;
  }

  save() {
    this.addCyberware.emit(this.cart);
    this.cart = new Array<Cp2020PlayerCyber>();
    this.cyberSearchInput.nativeElement.focus();
  }


  filterCyberList() {
    this.filteredDataCyber = this.dataCyber;
    if (this.searchFilter.type !== '') {
      this.filteredDataCyber = this.filteredDataCyber
        .filter(cyber => cyber.type === this.searchFilter.type);
    }
    if (this.searchFilter.name !== '') {
      this.filteredDataCyber = this.filteredDataCyber
        .filter(cyber => cyber.name.toLowerCase().includes(this.searchFilter.name.toLowerCase()));

    }
  }

}
