import { faStar, faTrash, faPlus, faQuestionCircle, faBookBookmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';
import { Observable } from 'rxjs';
import { CrCzReleasesDataService } from '../services/cr-cz-releases-data/cr-cz-releases-data.service';

@Component({
    selector: 'cs-cr-cz-gear-card',
    templateUrl: './cr-cz-gear-card.component.html',
    styleUrls: ['./cr-cz-gear-card.component.css'],
    standalone: false
})
export class CrCzGearCardComponent implements OnInit {
  faStar = faStar;
  faTrash = faTrash;
  faPlus = faPlus;
  faQuestionCircle = faQuestionCircle;
  faBookmark = faBookBookmark;
  faCircleCheck = faCircleCheck;

  @Input()
  gear: iCrCzGearItemCard;

  @Input()
  gearIndex: number = -1;

  @Input()
  totalStreetcred: number = 0;

  @Input()
  unitKeywords: Array<string> = [];

  @Input()
  teamFaction: string;

  @Input()
  count: number = 0;

  @Input()
  hasBulky: boolean = false;

  @Input()
  hasGear: boolean;

  @Output()
  remove: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  add: EventEmitter<iCrCzGearItemCard> = new EventEmitter<iCrCzGearItemCard>();

  releases: Array<string>;
  releaseList$: Observable<Array<string>>;

  constructor(private releaseListService: CrCzReleasesDataService) {}

  ngOnInit(): void {
    this.releaseList$ = this.releaseListService.GetFullReleaseNames(this.gear.release);
  }

  get rarityValid(): boolean {
    return this.count <= this.gear.rarity;
  }

  get credValid(): boolean {
    return this.gear.cred <= this.totalStreetcred ;
  }

  get isValid(): boolean {
    return this.rarityValid && this.credValid;
  }

  removeGear(): void {
    if(this.gearIndex > -1) {
      this.remove.emit(this.gearIndex);
    }
  }

  addGear(): void {
    if(this.gearIndex < 0) {
      this.add.emit(this.gear);
    } else {
      this.toggleCard();
    }
  }

  getAttributeWidth(hasAction: boolean, hasArmor: boolean): string {
    let length = 260;
    length -= (hasAction ? 30 : 0);
    length -= (hasArmor ? 30 : 0);
    return length + 'px';
  }

  toggleCard(): void {
    this.gear.flipped = !this.gear.flipped;
  }

}
