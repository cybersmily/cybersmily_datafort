import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020PlayerCyber } from './../../../models/cyberware/cp2020-player-cyber';
import { faSave, faTrash, faPlus, faDice } from '@fortawesome/free-solid-svg-icons';
import { CyberDataService } from './../../../services/data/cyber-data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataCyberware } from './../../../models/cyberware';

@Component({
  selector: 'cs-cp2020-cyberware-selector',
  templateUrl: './cp2020-cyberware-selector.component.html',
  styleUrls: ['./cp2020-cyberware-selector.component.css']
})
export class Cp2020CyberwareSelectorComponent implements OnInit {
  faSave = faSave;
  faTrash = faTrash;
  faPlus = faPlus;
  faDice = faDice;

  dataCyber: Array<DataCyberware> = new Array<DataCyberware>();
  searchFilter = {name: '', type: '', subtype: ''};
  selectedCyber: DataCyberware = new DataCyberware();

  cart: Array<Cp2020PlayerCyber> = new Array<Cp2020PlayerCyber>();

  @Output()
  addCyberware: EventEmitter<Array<Cp2020PlayerCyber>> = new EventEmitter<Array<Cp2020PlayerCyber>>();

  constructor(private cyberDataService: CyberDataService, private diceService: DiceService) { }

  ngOnInit(): void {
    this.cyberDataService
    .CyberwareList.subscribe( data => {
      this.dataCyber = data;
    });
  }

  setSelected(cyber: DataCyberware) {
    this.selectedCyber = cyber;
  }

  add(cyber: DataCyberware) {
    const found = this.cart.findIndex( c => c.name.toLowerCase() === cyber.name.toLowerCase());
    if ( found < 0) {
      this.cart.push(new Cp2020PlayerCyber(cyber));
    }
  }

  delete(index: number) {
    this.cart.splice(index, 1);
  }

  rollHumanityLose(index: number, dice: string) {
    const roll = this.diceService.rollMoreDice(dice);
    this.cart[index].hl = roll.total;
  }

  save() {
    this.addCyberware.emit(this.cart);
  }

  get totalHumanityLose(): number {
    return this.cart.reduce( (a, b) =>  a + ((b.hl && !isNaN(b.hl)) ? b.hl : 0), 0);
  }

  get totalCost(): number {
    return this.cart.reduce( (a, b) => a + b.cost, 0);
  }

}
