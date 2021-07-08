import { DiceService } from './../../shared/services/dice/dice.service';
import { faSave, faRedo, faFile, faDice } from '@fortawesome/free-solid-svg-icons';
import { SaveFileService } from './../../shared/services/file-services';
import { BigLeagueContact } from './../../shared/models/fixer/big-league-contact';
import { FixerBigLeagueService } from './../../shared/services/fixer/fixer-big-league.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-fixer-calc-big-league',
  templateUrl: './fixer-calc-big-league.component.html',
  styleUrls: ['./fixer-calc-big-league.component.css']
})
export class FixerCalcBigLeagueComponent implements OnInit {
  faSave = faSave;
  faRedo = faRedo;
  faFile = faFile;
  faDice = faDice;

  streetdeal = 5;
  contacts: Array<BigLeagueContact> = new Array<BigLeagueContact>();

  @Input()
  contactList: Array<string> = new Array<string>();

  constructor(private bigLeague: FixerBigLeagueService,
              private fileService: SaveFileService,
              private dice: DiceService
    ) {}

  ngOnInit() {
    this.bigLeague.model.subscribe( c => {
      this.contacts = c.contacts;
      this.streetdeal = c.streetdeal;
    });
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
    return (this.streetdeal > 0) && (this.availablePoints >= 1);
  }

  generateContacts() {
    if( this.canGenerateContacts) {
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
    this.bigLeague.reset();
  }

  save() {
    this.fileService.SaveAsFile('FixerBigLeagueContacts', this.bigLeague.toString());
  }
}
