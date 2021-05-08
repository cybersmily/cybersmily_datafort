import { Cp2020ArmorBlock } from './../../shared/cp2020/cp2020-armor/models/cp2020-armor-block';
import { Cp2020PlayerCyberList } from './../../shared/cp2020/cp2020-cyberware/models';
import { CpPlayerWeaponList } from './../../shared/cp2020/cp2020weapons/models';
import { SeoService } from './../../shared/services/seo/seo.service';
import { FileLoaderService, SaveFileService } from './../../shared/services/file-services';
import { faDice, faUpload, faFilePdf, faSave, faUndo, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../shared/models/cp2020character/cp2020-player-skills';
import { LifePathResults } from './../../shared/models/lifepath/lifepath-results';
import { Cp2020PlayerGearList } from './../../shared/models/cp2020character/cp2020-player-gear-list';
import { Cp2020StatBlock } from '../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerCharacter } from './../../shared/models/cp2020character/cp2020-player-character';
import { Cp2020CharacterGeneratorService } from './../../shared/services/chargen/cp2020-character-generator.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Cp2020PlayerRole } from './../../shared/models/cp2020character/cp2020-player-role';
import { Cp2020characterToPDF } from './../../shared/models/pdf/cp2020characterToPDF';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  character: Cp2020PlayerCharacter;
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
    private fileLoader: FileLoaderService,
    private modalService: BsModalService,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Character Generator',
      "2020-07-01 Cybersmily's Datafort Cyberpunk 2020 Character Generator. This app can print to PDF and save/load the character sheet"
    );
    this.characterService.character.subscribe((data) => {
      this.character = data;
    });
  }

  changeHandle(value: string) {
    this.characterService.changeHandle(value);
  }

  changeRole(value: Cp2020PlayerRole) {
    this.characterService.changeRole(value);
  }

  changeStats(value: Cp2020StatBlock) {
    this.characterService.changeStats(value);
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

  changeWeapons(value: CpPlayerWeaponList) {
    this.characterService.changeWeapons(value);
  }

  changeLifepath(value: LifePathResults) {
    this.characterService.changeLifepath(value);
  }

  changeSkills(value: Cp2020PlayerSkills) {
    this.characterService.changeSkills(value);
  }

  changeImage(value: string) { }

  changeRep(value: number) {
    this.characterService.changeRep(value);
  }

  resetCharacter() {
    this.characterService.clearCharacter();
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
    const characterToPDF = new Cp2020characterToPDF();
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
      .subscribe((data) => this.characterService.changeCharacter(data));
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
}
