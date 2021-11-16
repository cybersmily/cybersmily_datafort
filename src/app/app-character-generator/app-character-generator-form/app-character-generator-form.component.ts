import { Cp2020DeckmanagerPdfSectionService } from './../../shared/cp2020/cp2020-netrun-gear/services/cp2020-deckmanager-pdf-section/cp2020-deckmanager-pdf-section.service';
import { Cp2020ArmorPDFSectionService } from './../../shared/cp2020/cp2020-armor/services/cp2020-armor-pdf-section/cp2020-armor-pdf-section.service';
import { Cp2020CyberdeckManager } from './../../shared/cp2020/cp2020-netrun-gear/models/cp2020-cyberdeck-manager';
import { TitleValue } from './../../shared/models/title-value';
import { SourcesDataService } from './../../shared/cp2020/cp2020-lifepath/services/sources-data.service';
import { Cp2020CharGenSettings } from './../../shared/cp2020/models/cp2020-char-gen-settings';
import { Cp2020ArmorBlock } from './../../shared/cp2020/cp2020-armor/models/cp2020-armor-block';
import { Cp2020PlayerCyberList } from './../../shared/cp2020/cp2020-cyberware/models';
import { CpPlayerWeaponList } from './../../shared/cp2020/cp2020weapons/models';
import { SeoService } from './../../shared/services/seo/seo.service';
import { FileLoaderService, SaveFileService } from './../../shared/services/file-services';
import { faDice, faUpload, faFilePdf, faSave, faUndo, faQuestionCircle, faChevronRight, faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../shared/cp2020/cp2020-skills/models/cp2020-player-skills';
import { LifePathResults } from './../../shared/cp2020/cp2020-lifepath/models';
import { Cp2020PlayerGearList } from './../../shared/models/cp2020character/cp2020-player-gear-list';
import { Cp2020StatBlock } from '../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerCharacter } from './../../shared/models/cp2020character/cp2020-player-character';
import { Cp2020CharacterGeneratorService } from './../../shared/services/chargen/cp2020-character-generator.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Cp2020PlayerRole } from '../../shared/cp2020/cp2020-role/models/cp2020-player-role';
import { Cp2020characterToPDF } from './../../shared/models/pdf/cp2020characterToPDF';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020Lifestyle } from './../../shared/cp2020/cp2020-lifestyle/models';
import { Cp2020Vehicle } from './../../shared/cp2020/cp2020-vehicles/models';

@Component({
  selector: 'cs-app-character-generator-form',
  templateUrl: './app-character-generator-form.component.html',
  styleUrls: ['./app-character-generator-form.component.css'],
})
export class AppCharacterGeneratorFormComponent implements OnInit {
  faDice = faDice;
  faUpload = faUpload;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faQuestionCircle = faQuestionCircle;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faCog = faCog;

  isCollapsed = false;
  get collapseChevron():any {
    return (this.isNotesCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  character: Cp2020PlayerCharacter;
  sources = new Array<TitleValue>();
  charGenSettings: Cp2020CharGenSettings = new Cp2020CharGenSettings();
  charGenSettingsKey: string = 'CP2020_CharGenSettings';

  isNotesCollapsed = false;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };


  @ViewChild('pdfCP2020Character', { static: false })
  pdfCP2020Character: ElementRef;

  constructor(
    private characterService: Cp2020CharacterGeneratorService,
    private saveFileService: SaveFileService,
    private sourceService: SourcesDataService,
    private fileLoader: FileLoaderService,
    private modalService: BsModalService,
    private armorPDFService: Cp2020ArmorPDFSectionService,
    private deckmanagerPDFService: Cp2020DeckmanagerPdfSectionService,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Character Generator',
      "2020-07-01 Cybersmily's Datafort Cyberpunk 2020 Character Generator. This app can print to PDF and save/load the character sheet"
    );
    this.characterService.character.subscribe((data) => {
      this.character = data;
      this.loadSettings();
      this.charGenSettings.isIU = this.character.isIU;
      this.saveSettings();
      this.isNotesCollapsed = this.charGenSettings.isCollapsed;
    });
    this.sourceService
    .getSources()
    .subscribe( sources => {
      this.sources = sources;
    });
  }

  changeCharacter(){
    this.characterService.changeCharacter(this.character);
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

  changeImage(value: string) { }

  changeRep(value: number) {
    this.characterService.changeRep(value);
  }

  resetCharacter() {
    this.characterService
    .clearCharacter(this.charGenSettings.isIU);
  }

  updateNotes() {
    this.characterService.changeNotes(this.character.notes);
  }

  /**
   * Save the character json to a txt file.
   *
   * @memberof AppCharacterGeneratorFormComponent
   */
  saveCharacter() {
    this.saveFileService.SaveAsFile(
      'CP2020_' + this.character.handle.replace(' ', '_'),
      JSON.stringify(this.character)
    );
  }

  createPDF() {
    const characterToPDF = new Cp2020characterToPDF(this.armorPDFService, this.deckmanagerPDFService);
    characterToPDF.generatePdf(this.character);
  }

  /**
   * load the character file to the page. Note, the handler needed
   * to be call from a separate function.
   *
   * @param {*} $event
   * @memberof AppCharacterGeneratorFormComponent
   */
  loadCharacter($event) {
    this.fileLoader
      .importJSON($event.target.files[0])
      .subscribe((data) => this.characterService.changeCharacter(data) );
  }

  loadSettings() {
    const settings:string = window.localStorage.getItem(this.charGenSettingsKey);
    this.charGenSettings = new Cp2020CharGenSettings(JSON.parse(settings));
  }

  saveSettings() {
    window.localStorage.setItem(this.charGenSettingsKey, JSON.stringify(this.charGenSettings));
  }

  saveIU() {
    this.characterService.changeIU(this.charGenSettings.isIU);
    this.saveSettings();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  get combatSense(): number {
    let result = 0;
    if (this.character.role.specialAbility.name.toLowerCase() === 'combatsense'
      || this.character.role.specialAbility.name.toLowerCase() === 'combat sense') {
      result = this.character.role.specialAbility.value;
    }
    return result;
  }

  get initiative(): number {
    if (!this.character.isIU){
      return -1;
    }
    const found = this.character.skills.skills.find(sk => sk.name.toLowerCase() === 'initiative');
    return found ? found.value : 0;
  }
}
