import { FixerBigLeagueGenerationService } from './../../services/fixer-big-league-generation/fixer-big-league-generation.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { faDice, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BigLeagueContact } from '../../models';

@Component({
    selector: 'cs-cp2020-big-league-contacts',
    templateUrl: './cp2020-big-league-contacts.component.html',
    styleUrls: ['./cp2020-big-league-contacts.component.css'],
    standalone: false
})
export class Cp2020BigLeagueContactsComponent implements OnInit {
  faDice = faDice;
  faRedo = faRedo;

  @Input()
  bigLeagueContacts: Array<BigLeagueContact> = new Array<BigLeagueContact>();

  @Input()
  skillLevel: number = 0;

  @Output()
  updateContacts: EventEmitter<Array<BigLeagueContact>> = new EventEmitter<
    Array<BigLeagueContact>
  >();

  currContacts: Array<BigLeagueContact> = new Array<BigLeagueContact>();

  get totalPoints(): number {
    return this.skillLevel * this.skillLevel * 4; // streetdeal*2 squared
  }

  get spentPoints(): number {
    return this.currContacts.reduce((a, b) => a + b?.cost, 0);
  }

  get availablePoints(): number {
    return this.totalPoints - this.spentPoints;
  }

  get canGenerateContacts(): boolean {
    return this.skillLevel > 0;
  }

  constructor(
    private bigLeagueGeneratorService: FixerBigLeagueGenerationService,
    private dice: DiceService
  ) {}

  ngOnInit(): void {
    this.currContacts = this.bigLeagueContacts.map(
      (con) => new BigLeagueContact(con)
    );
  }

  generateContacts() {
    if (this.canGenerateContacts) {
      this.currContacts = new Array<BigLeagueContact>();
      this.currContacts = this.bigLeagueGeneratorService.generateContactList(
        this.dice,
        this.currContacts.map((con) => con.name),
        this.availablePoints
      );
      this.update();
    }
  }

  update(): void {
    this.updateContacts.emit(this.currContacts);
  }

  deleteContact(index: number): void {
    this.currContacts.splice(index, 1);
    this.update();
  }

  updateContact(value: { index: number; contact: BigLeagueContact }): void {
    this.currContacts[value.index] = new BigLeagueContact(value.contact);
    this.update();
  }

  addContact(contact: BigLeagueContact): void {
    this.currContacts.push(contact);
    this.update();
  }

  reset(): void {
    this.currContacts = new Array<BigLeagueContact>();
    this.update();
  }
}
