import { DiceService } from '../../../../services/dice/dice.service';
import {
  faSave,
  faRedo,
  faFile,
  faDice,
} from '@fortawesome/free-solid-svg-icons';
import { SaveFileService } from '../../../../services/file-services';
import { BigLeagueContact } from './../../models';
import { FixerBigLeagueService } from './../../services/fixer-big-league/fixer-big-league.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cs-fixer-calc-big-league',
    templateUrl: './fixer-calc-big-league.component.html',
    styleUrls: ['./fixer-calc-big-league.component.css'],
    standalone: false
})
export class FixerCalcBigLeagueComponent implements OnInit {
  faSave = faSave;
  faRedo = faRedo;
  faFile = faFile;
  faDice = faDice;

  contacts: Array<BigLeagueContact> = new Array<BigLeagueContact>();

  @Input()
  contactList: Array<string> = new Array<string>();

  @Input()
  streetdeal = 5;

  constructor(
    private bigLeague: FixerBigLeagueService,
    private fileService: SaveFileService,
    private dice: DiceService
  ) {}

  ngOnInit() {
    this.bigLeague.setStreetdeal(this.streetdeal);
    this.bigLeague.model.subscribe((c) => {
      this.contacts = c.contacts;
    });
  }

  ngOnChanges() {
    this.bigLeague.setStreetdeal(this.streetdeal);
  }

  get totalPoints(): number {
    return this.bigLeague.totalPoints;
  }

  get spentPoints(): number {
    return this.bigLeague.spentPoints;
  }

  get availablePoints(): number {
    return this.bigLeague.availablePoints;
  }

  get canGenerateContacts(): boolean {
    return this.streetdeal > 0 && this.availablePoints >= 1;
  }

  generateContacts() {
    if (this.canGenerateContacts) {
      this.bigLeague.generateContactList(this.dice, this.contactList);
    }
  }

  changeStreetdeal() {
    this.bigLeague.setStreetdeal(this.streetdeal);
  }

  addContact(value: BigLeagueContact) {
    this.bigLeague.addContact(value);
  }

  deleteContact(index: number) {
    this.bigLeague.deleteContact(index);
  }
  editContact(contact: BigLeagueContact) {
    this.bigLeague.updateContact(contact);
  }

  reset() {
    this.bigLeague.reset(this.streetdeal);
  }

  save() {
    this.fileService.SaveAsFile(
      'FixerBigLeagueContacts',
      this.bigLeague.toString()
    );
  }
}
