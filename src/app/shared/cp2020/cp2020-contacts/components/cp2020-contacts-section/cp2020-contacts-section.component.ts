import { Observable, of, map } from 'rxjs';
import { Cp2020CharacterGeneratorService } from './../../../../services/chargen/cp2020-character-generator.service';
import {
  HotStuffArea,
  Cp2020PlayerContacts,
  Cp2020ContactSettings,
  BigLeagueContact,
  Cp2020PlayerContact,
} from './../../models';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-contacts-section',
  templateUrl: './cp2020-contacts-section.component.html',
  styleUrls: ['./cp2020-contacts-section.component.css'],
})
export class Cp2020ContactsSectionComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  @Input()
  isCollapsed: boolean = false;

  @Input()
  contactSettings: Cp2020ContactSettings = new Cp2020ContactSettings();

  skillLevel$: Observable<number>;
  contacts$: Observable<Cp2020PlayerContacts>;

  currContacts: Cp2020PlayerContacts = new Cp2020PlayerContacts();

  get collapseChevron(): any {
    return this.isCollapsed ? faChevronRight : faChevronDown;
  }

  constructor(private characterService: Cp2020CharacterGeneratorService) {}

  ngOnInit(): void {
    this.contacts$ = this.characterService.character.pipe(
      map((char) => {
        this.currContacts = new Cp2020PlayerContacts(char.contacts);
        return char.contacts;
      })
    );
    this.skillLevel$ = this.characterService.character.pipe(
      map((char) => {
        if (this.contactSettings.skillLevelOverride > 0) {
          return this.contactSettings.skillLevelOverride;
        }
        const useSkill = this.contactSettings.useSkill;
        const skill = char.skills.skills.find(
          (skill) => skill?.name?.toLowerCase() === useSkill?.toLowerCase()
        );
        return skill?.value;
      })
    );
  }

  update(): void {}

  updateBigLeague(event: Array<BigLeagueContact>): void {
    this.currContacts.bigLeague = event;
    this.characterService.changeContact(this.currContacts);
  }

  updateHotStuff(event: Array<HotStuffArea>): void {
    this.currContacts.hotStuff = event;
    this.characterService.changeContact(this.currContacts);
  }

  updatePlayerContacts(event: Array<Cp2020PlayerContact>): void {
    this.currContacts.other = event;
    this.characterService.changeContact(this.currContacts);
  }
}
