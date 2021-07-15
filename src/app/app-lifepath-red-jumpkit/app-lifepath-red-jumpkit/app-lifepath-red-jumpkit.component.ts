import { CPRedLifePathService } from './../../shared/cpred/services/cpredlifepath/c-p-red-life-path.service';
import { faFilePdf, faSave, faDice } from '@fortawesome/free-solid-svg-icons';
import { CPRedCharacterPDFService } from './../../shared/cpred/services/cprcharpdf/c-p-red-character-p-d-f.service';
import { SeoService } from './../../shared/services/seo/seo.service';
import { SaveFileService } from './../../shared/services/file-services';
import { CPRedLifepathJumpStart } from '../../shared/cpred/models/cp-red-lifepath-js';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-app-lifepath-red-jumpkit',
  templateUrl: './app-lifepath-red-jumpkit.component.html',
  styleUrls: ['./app-lifepath-red-jumpkit.component.css']
})
export class AppLifepathRedJumpkitComponent implements OnInit {
  faFilePdf = faFilePdf;
  faSave = faSave;
  faDice = faDice;

  enabled = false;
  LifePath = new CPRedLifepathJumpStart();

  constructor(private lifepathService: CPRedLifePathService,
              private saveFileService: SaveFileService,
              private pdfService: CPRedCharacterPDFService,
              private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk Red Jumpstart Kit Lifepath',
      '2020-07, Cybersmily\'s Datafort Cyberpunk  Red Jumpstart Kit Lifepath is an application to generate a character\'s lifepath.'
    );
    this.enabled = true;
    this.LifePath = new CPRedLifepathJumpStart();
  }

  generate() {
    this.lifepathService
    .generateJumpStart()
    .subscribe(data => {
      this.LifePath = data;
    });
  }

  saveFile() {
    this.saveFileService.SaveAsFile( 'CPRedJumpkitLifepath', this.LifePath.print());
  }

  saveAsPDF() {
    this.pdfService.generateLifePahtPDF(this.LifePath);
  }

}
