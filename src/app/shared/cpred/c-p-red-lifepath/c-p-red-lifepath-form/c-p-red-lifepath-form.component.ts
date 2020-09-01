import { faFilePdf, faSave, faDice } from '@fortawesome/free-solid-svg-icons';
import { CPRedCharacterPDFService } from './../../services/cprcharpdf/c-p-red-character-p-d-f.service';
import { SeoService } from './../../../services/seo/seo.service';
import { SaveFileService } from './../../../services/save-file.service';
import { RedJumpkitLifepathService } from '../../services/cprlifepath/red-jumpkit-lifepath.service';
import { CPRedLifepath } from '../../models/cpred-lifepath';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-c-p-red-lifepath-form',
  templateUrl: './c-p-red-lifepath-form.component.html',
  styleUrls: ['./c-p-red-lifepath-form.component.css']
})
export class CPRedLifepathFormComponent implements OnInit {

  faFilePdf = faFilePdf;
  faSave = faSave;
  faDice = faDice;

  enabled = false;
  LifePath = new CPRedLifepath();

  constructor(private lifepathService: RedJumpkitLifepathService,
              private saveFileService: SaveFileService,
              private pdfService: CPRedCharacterPDFService,
              private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk Red Jumpstart Kit Lifepath',
      '2020-07, Cybersmily\'s Datafort Cyberpunk  Red Jumpstart Kit Lifepath is an application to generate a character\'s lifepath.'
    );
    this.enabled = true;
    this.LifePath = new CPRedLifepath();
  }

  generate() {
    this.lifepathService
    .generateLifePath()
    .subscribe(data => this.LifePath = data);
  }

  generateBackground() {
    this.lifepathService
    .generateBackground()
    .subscribe( data => this.LifePath.background = data);
  }

  generateMotivation() {
    this.lifepathService
    .generateMotivation()
    .subscribe( data => this.LifePath.motivation = data);
  }

  generateGoals() {
    this.lifepathService
    .generateGoals()
    .subscribe( data => this.LifePath.goals = data);
  }

  generateRomance() {
    this.lifepathService
    .generateRomance()
    .subscribe( data => this.LifePath.romance = data);
  }

  generatePersonality() {
    this.lifepathService
    .generatePersonality()
    .subscribe( data => this.LifePath.personality = data);
  }

  generateFriends() {
    this.lifepathService
    .generateFriends()
    .subscribe( data => this.LifePath.friends = data);
  }

  generateEnemies() {
    this.lifepathService
    .generateEnemies()
    .subscribe( data => this.LifePath.enemies = data);
  }

  saveFile() {
    this.saveFileService.SaveAsFile( 'CPRedJumpkitLifepath', this.LifePath.print());
  }

  saveAsPDF() {
    this.pdfService.generateLifePahtPDF(this.LifePath);

  }

}
