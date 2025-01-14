import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CrCzGearDataService } from '../services/cr-cz-gear-data/cr-cz-gear-data.service';
import { Observable } from 'rxjs';
import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';

@Component({
  selector: 'cs-cr-cz-gear-list',
  templateUrl: './cr-cz-gear-list.component.html',
  styleUrls: ['./cr-cz-gear-list.component.css']
})
export class CrCzGearListComponent implements OnInit {
  faStar = faStar;
  faPlus = faPlus;

  dataList$: Observable<Array<iCrCzGearItemCard>>;
  filterName: string = '';

  @Input()
  filterFaction: string = '';

  @Input()
  unitFaction: string = '';

  @Input()
  totalStreetcred: number = 0;

  @Input()
  existingGear: Array<string> = [];

  @Input()
  characterGear: Array<string> = [];

  @Output()
  addGear: EventEmitter<iCrCzGearItemCard> = new EventEmitter<iCrCzGearItemCard>();

  constructor(private gearDataService: CrCzGearDataService){}

  ngOnInit(): void {
    console.log('totalStreetcred - Gearlist', this.totalStreetcred);
    this.dataList$ = this.gearDataService.gearList;
  }
  setFaction($event): void {
    this.filterFaction = $event;
  }

  getCount(title: string): number {
    return this.existingGear.filter(name => name === title).length;
  }

  characterHasGear(title: string): boolean {
    return this.characterGear?.includes(title);
  }

  checkRarity(title: string, rarity: number): boolean {
    return this.getCount(title) > rarity;
  }

  buyGear(gear: iCrCzGearItemCard) {
    this.addGear.emit(gear);
  }
}
