import { SaveFileService } from './../../../../services/file-services/save-file/save-file.service';
import { FixerBigLeagueGenerationService } from './../../services/fixer-big-league-generation/fixer-big-league-generation.service';
import { DiceService } from './../../../../services/dice/dice.service';
import { faDice, faRedo, faFile } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, input, output } from '@angular/core';
import { BigLeagueContact } from '../../models';

@Component({
    selector: 'cs-cp2020-big-league-contacts',
    templateUrl: './cp2020-big-league-contacts.component.html',
    styleUrls: ['./cp2020-big-league-contacts.component.css'],
    standalone: false
})
export class Cp2020BigLeagueContactsComponent implements OnInit {
  bigLeagueContacts = input<Array<BigLeagueContact>>(new Array<BigLeagueContact>());
  skillLevel = input<number>(0);
  canPrint = input<boolean>(false);

  updateContacts = output<Array<BigLeagueContact>>();

  faDice = faDice;
  faRedo = faRedo;
  faFile = faFile;

  currContacts: Array<BigLeagueContact> = new Array<BigLeagueContact>();
  currSkillLevel: number = 0;
  totalPoints: number = 0;
  spentPoints: number  = 0;
  availablePoints: number = 0;

  constructor(
    private bigLeagueGeneratorService: FixerBigLeagueGenerationService,
    private dice: DiceService,
    private fileService: SaveFileService
  ) {}

  ngOnInit(): void {
    this.currContacts = this.bigLeagueContacts()?.map(
      (con) => new BigLeagueContact(con)
    ) || [];
    this.currSkillLevel = this.skillLevel();
    this.calculatePoints();
  }

  private calculatePoints(): void {
    this.spentPoints = this.currContacts.reduce((a, b) => a + b?.cost, 0);
    this.totalPoints = this.skillLevel() * this.skillLevel() * 4;
    this.availablePoints = this.totalPoints - this.spentPoints;
  }

  generateContacts() {
    if (this.skillLevel() > 0) {
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
    this.calculatePoints();
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

  print(): void {
    const contacts = this.currContacts?.map(contact => `${contact?.name} [cap: ${contact.capability.name}; rep: ${contact.reputation.name}; avail: ${contact.availability.name}; rel: ${contact.reliability.name}] ${contact.cost}pts\nDetails: ${contact.details}`);
    this.fileService.SaveAsFile('Big League Contacts', contacts.join('\n\n'), 'txt');

  }
}
