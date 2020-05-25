import { FileLoaderService } from './../../shared/services/file-loader/file-loader.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../shared/models/cp2020character/cp2020-player-skills';
import { SaveFileService } from './../../shared/services/save-file.service';
import { LifePathResults } from './../../shared/models/lifepath/lifepath-results';
import { CpPlayerWeaponList } from '../../shared/models/weapon';
import { Cp2020PlayerGearList } from './../../shared/models/cp2020character/cp2020-player-gear-list';
import { Cp2020PlayerCyberList } from '../../shared/models/cyberware/cp2020-player-cyber-list';
import { Cp2020ArmorBlock } from './../../shared/models/cp2020character/cp2020-armor-block';
import { Cp2020StatBlock } from './../../shared/models/cp2020character/cp2020-stat-block';
import { Cp2020PlayerCharacter } from './../../shared/models/cp2020character/cp2020-player-character';
import { Cp2020CharacterGeneratorService } from './../../shared/services/chargen/cp2020-character-generator.service';
import { Component, OnInit } from '@angular/core';
import { Cp2020PlayerRole } from './../../shared/models/cp2020character/cp2020-player-role';

@Component({
  selector: 'cs-app-character-generator-form',
  templateUrl: './app-character-generator-form.component.html',
  styleUrls: ['./app-character-generator-form.component.css']
})
export class AppCharacterGeneratorFormComponent implements OnInit {
  faDice = faDice;

  character: Cp2020PlayerCharacter;

  constructor( private characterService: Cp2020CharacterGeneratorService,
               private saveFileService: SaveFileService,
               private fileLoader: FileLoaderService) { }

  ngOnInit() {
    this.characterService.character.subscribe( data => {
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

  changeLifepath( value: LifePathResults) {
    this.characterService.changeLifepath(value);
  }

  changeSkills( value: Cp2020PlayerSkills) {
    this.characterService.changeSkills(value);
  }

  changeImage(value: string) {

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
    this.saveFileService.SaveAsFile('CP2020_' + (this.character.handle.replace(' ', '_')), JSON.stringify(this.character));
  }


  /**
   * load the character file to the page. Note, the handler needed
   * to be call from a separate function.
   *
   * @param {*} $event
   * @memberof AppCharacterGeneratorFormComponent
   */
  loadCharacter($event) {
    this.fileLoader.importJSON($event.target.files[0])
    .subscribe( data =>  this.characterService.changeCharacter(data));
  }

}
