import { SeoService } from './../../shared/services/seo/seo.service';
import { Cp2020ACPAPdfService } from './../../shared/cp2020/cp2020-acpa/services/cp2020-acpa-pdf/cp2020-acpa-pdf.service';
import { Cp2020ACPA } from './../../shared/cp2020/cp2020-acpa/models/cp2020-acpa';
import { SaveFileService } from './../../shared/services/file-services/save-file/save-file.service';
import { FileLoaderService } from './../../shared/services/file-services/file-loader/file-loader.service';
import { Cp2020ACPABuilderService } from './../../shared/cp2020/cp2020-acpa/services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { faUpload, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-acpa-generator-main',
  templateUrl: './acpa-generator-main.component.html',
  styleUrls: ['./acpa-generator-main.component.css']
})
export class AcpaGeneratorMainComponent implements OnInit {
  faUpload = faUpload;
  faSave = faSave;
  faFilePdf = faFilePdf;
  currACPA = new Cp2020ACPA();

  constructor(
    private acpaBuilder: Cp2020ACPABuilderService,
    private fileLoaderService: FileLoaderService,
    private saveFileService: SaveFileService,
    private acpaPdfService: Cp2020ACPAPdfService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'ACPA Generator for Cyberpunk 2020',
      "2021-11-21 Cybersmily's Datafort ACPA Generator for Cyberpunk 2020. This app can prints PDF and save/load ACPA sheets"
    );
    this.acpaBuilder.acpa.subscribe(acpa => {
      this.currACPA = acpa;
    });
  }

  loadJSONFile($event) {
    this.fileLoaderService
      .importJSON<Cp2020ACPA>($event.target.files[0])
      .subscribe((data) => this.acpaBuilder.update(data) );
  }

  saveJSONFile() {
    this.saveFileService.SaveAsFile('cp2020_acpa', JSON.stringify(this.currACPA),'.json');
  }

  savePDFFile() {
    this.acpaPdfService.saveFile(this.currACPA);
  }

}
