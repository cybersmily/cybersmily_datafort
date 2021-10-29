import { ArmorDataListService } from './../services/armor-data-list/armor-data-list.service';
import { Cp2020ArmorPiece } from './../models/cp2020-armor-piece';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-source-armor-list',
  templateUrl: './cp2020-source-armor-list.component.html',
  styleUrls: ['./cp2020-source-armor-list.component.css']
})
export class Cp2020SourceArmorListComponent implements OnInit {

  armorList = new Array<Cp2020ArmorPiece>();

  @Output()
  selectedArmor = new EventEmitter<Cp2020ArmorPiece>();

  constructor(private armorDataListService: ArmorDataListService) { }

  ngOnInit(): void {
    this.armorDataListService.getData().subscribe( list => {
      console.log(list);
      this.armorList = list.map( armor => new Cp2020ArmorPiece(armor));
    });
  }

  select(index: number) {
    this.selectedArmor.emit(this.armorList[index]);
  }

  getLocations(armor: Cp2020ArmorPiece) {
    if(armor.clothes.loc !== '') {
      return armor.clothes.loc;
    }
    return Object.keys(armor.locations)
    .filter(loc => !loc.startsWith('l'))
    .map(loc => {
      if(loc.startsWith('r')) {
        return loc.substring(1) + 's';
      }
      return loc;
    }).join('|');
  }

}
