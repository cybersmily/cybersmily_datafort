import { debounceTime, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Cp2020CyberdeckManager } from './../../shared/cp2020/cp2020-netrun-gear/models/cp2020-cyberdeck-manager';
import { TitleValue } from './../../shared/models/title-value';
import { SourcesDataService } from './../../shared/cp2020/cp2020-lifepath/services/sources-data.service';
import { Cp2020CharGenSettings } from './../../shared/cp2020/models/cp2020-char-gen-settings';
import { Cp2020ArmorBlock } from './../../shared/cp2020/cp2020-armor/models/cp2020-armor-block';
import { Cp2020PlayerCyberList } from './../../shared/cp2020/cp2020-cyberware/models';
import { CpPlayerWeaponList } from './../../shared/cp2020/cp2020weapons/models';
import {
  faDice,
  faChevronRight,
  faChevronDown,
  faIdBadge
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../shared/cp2020/cp2020-skills/models/cp2020-player-skills';
import { LifePathResults } from './../../shared/cp2020/cp2020-lifepath/models';
import { Cp2020PlayerGearList } from '../../shared/cp2020/cp2020-gear/models/cp2020-player-gear-list';
import { Cp2020StatBlock } from '../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerCharacter } from './../../shared/models/cp2020character/cp2020-player-character';
import { Cp2020CharacterGeneratorService } from './../../shared/services/chargen/cp2020-character-generator.service';
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Cp2020PlayerRole } from '../../shared/cp2020/cp2020-role/models/cp2020-player-role';
import { Cp2020Lifestyle } from './../../shared/cp2020/cp2020-lifestyle/models';
import { Cp2020Vehicle } from './../../shared/cp2020/cp2020-vehicles/models';

@Component({
    selector: 'cs-app-character-generator-mobile-layout',
    templateUrl: './app-character-generator-mobile-layout.component.html',
    styleUrls: ['./app-character-generator-mobile-layout.component.css'],
    standalone: false
})
export class AppCharacterGeneratorMobileLayoutComponent {

  faDice = faDice;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faIdBadge = faIdBadge;

  isCollapsed = false;
  collapseChevron(collapse: boolean): any {
    return collapse ?  this.faChevronDown : this.faChevronRight;
  }

  character$: Observable<Cp2020PlayerCharacter>;
  sources = new Array<TitleValue>();
  initiative: number = 0;
  combatSense: number = 0;
  baseRef: number = 0;
  baseInt: number = 0;
  notes: string = '';

  @Input()
  charGenSettings: Cp2020CharGenSettings = new Cp2020CharGenSettings();

  @Output()
  updateSettings: EventEmitter<Cp2020CharGenSettings> = new EventEmitter<Cp2020CharGenSettings>();

  isNotesCollapsed = this.charGenSettings.isCollapsed;
  isWoundsCollpased = this.charGenSettings.isCollapsed;
  isStatsCollapsed = this.charGenSettings.isCollapsed;

  @ViewChild('pdfCP2020Character', { static: false })
  pdfCP2020Character: ElementRef;

  notesSubject: Subject<string> = new Subject();

  constructor(
    private characterService: Cp2020CharacterGeneratorService,
    private sourceService: SourcesDataService
  ) {}

  ngOnInit() {
    this.isNotesCollapsed = this.charGenSettings.isCollapsed;
    this.character$ = this.characterService.character.pipe(
      map((data) => {
        this.charGenSettings.isIU = data.isIU;
        this.baseInt = data.stats.INT.Base;
        this.baseRef = data.stats.REF.Base;
        this.initiative = this.getInitiative(data);
        this.combatSense = this.getCombatSense(data);
        this.notes = data.notes;
        data.skills.showWithValues = data.skills.showWithValues || this.charGenSettings.skillSettings.showOnlySkillsWithRanks;
        return data;
      })
    );
    this.sourceService.getSources().subscribe((sources) => {
      this.sources = sources;
    });
    this.notesSubject.pipe(debounceTime(500)).subscribe((note) => {
      this.characterService.changeNotes(this.notes);
    });
  }

  OnDestroy(): void {
    this.notesSubject.unsubscribe();
  }

  changeHandle(value: string) {
    this.characterService.changeHandle(value);
  }

  changeRole(value: Cp2020PlayerRole) {
    this.characterService.changeRole(value);
  }

  changeSeconaryRole(value: Array<Cp2020PlayerRole>) {
    this.characterService.changeSecondaryRoles(value);
  }

  changeStats(value: Cp2020StatBlock) {
    this.setSkillSettingStats();
    this.characterService.changeStats(value);
  }

  woundCharacter(value: number) {
    this.characterService.woundCharacter(value);
  }

  changeArmor(value: Cp2020ArmorBlock) {
    this.characterService.changeArmor(value);
  }

  changeCyber(value: Cp2020PlayerCyberList) {
    this.characterService.changeCyberware(value);
  }

  changeGear(value: Cp2020PlayerGearList) {
    this.characterService.changeGear(value);
  }

  changeCyberdeckPrograms(value: Cp2020CyberdeckManager) {
    this.characterService.changeCyberdeckPrograms(value);
  }

  changeVehicles(value: Array<Cp2020Vehicle>) {
    this.characterService.changeVehicles(value);
  }

  changeWeapons(value: CpPlayerWeaponList) {
    this.characterService.changeWeapons(value);
  }

  changeLifepath(value: LifePathResults) {
    this.characterService.changeLifepath(value);
  }

  changeLifestyle(value: Cp2020Lifestyle) {
    this.characterService.changeLifeStyle(value);
  }

  changeSkills(value: Cp2020PlayerSkills) {
    this.characterService.changeSkills(value);
  }

  changeImage(value: string) {
    this.characterService.changeImage(value);
  }

  changeRep(value: number) {
    this.characterService.changeRep(value);
  }

  resetCharacter() {
    this.characterService.clearCharacter(this.charGenSettings.isIU);
  }

  updateNotes() {
    this.notesSubject.next(this.notes);
  }


  setSkillSettingStats() {
    this.charGenSettings.skillSettings.ref = this.baseRef;
    this.charGenSettings.skillSettings.ref = this.baseInt;
    this.updateSettings.emit(this.charGenSettings);
  }

  getCombatSense(character: Cp2020PlayerCharacter): number {
    let result = 0;
    if (
      character.role.specialAbility.name.toLowerCase() === 'combatsense' ||
      character.role.specialAbility.name.toLowerCase() === 'combat sense'
    ) {
      result = character.role.specialAbility.value;
    }
    return result;
  }

  getInitiative(character: Cp2020PlayerCharacter): number {
    if (!character.isIU) {
      return -1;
    }
    const found = character.skills.skills.find(
      (sk) => sk.name.toLowerCase() === 'initiative'
    );
    return found ? found.value : 0;
  }

}
