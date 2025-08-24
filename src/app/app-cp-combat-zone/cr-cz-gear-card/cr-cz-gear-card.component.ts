import { faStar, faTrash, faPlus, faQuestionCircle, faBookBookmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Component, input, Input, OnInit, output } from '@angular/core';
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

  gear = input<iCrCzGearItemCard>();
  unitKeywords = input<Array<string>>([]);
  teamFaction = input<string>();
  gearIndex = input<number>(-1);
  totalStreetcred = input<number>(0);
  count = input<number>(0);
  hasBulky = input<boolean>();
  hasGear = input<boolean>();

  remove = output<number>();
  add = output<iCrCzGearItemCard>();

  releases: Array<string>;
  releaseList$: Observable<Array<string>>;

  constructor(private releaseListService: CrCzReleasesDataService) {}

  ngOnInit(): void {
    this.releaseList$ = this.releaseListService.GetFullReleaseNames(this.gear().release);
  }

  get rarityValid(): boolean {
    return this.count() <= this.gear().rarity;
  }

  get credValid(): boolean {
    return this.gear().cred <= this.totalStreetcred() ;
  }

  get isValid(): boolean {
    return this.rarityValid && this.credValid;
  }

  removeGear(): void {
    if(this.gearIndex() > -1) {
      this.remove.emit(this.gearIndex());
    }
  }

  addGear(): void {
    if(this.gearIndex() < 0) {
      this.add.emit(this.gear());
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
    this.gear().flipped = !this.gear().flipped;
  }

}
