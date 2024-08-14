import { faStar, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';

@Component({
  selector: 'cs-cr-cz-gear-card',
  templateUrl: './cr-cz-gear-card.component.html',
  styleUrl: './cr-cz-gear-card.component.css'
})
export class CrCzGearCardComponent {
  faStar = faStar;
  faTrash = faTrash;
  faPlus = faPlus;

  @Input()
  gear: iCrCzGearItemCard;

  @Input()
  gearIndex: number = -1;

  @Input()
  totalStreetcred: number = 0;

  @Input()
  unitFaction: string = '';

  @Output()
  remove: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  add: EventEmitter<iCrCzGearItemCard> = new EventEmitter<iCrCzGearItemCard>();


  removeGear(): void {
    if(this.gearIndex > -1) {
      this.remove.emit(this.gearIndex);
    }
  }

  addGear(): void {
    this.add.emit(this.gear);
  }

}
