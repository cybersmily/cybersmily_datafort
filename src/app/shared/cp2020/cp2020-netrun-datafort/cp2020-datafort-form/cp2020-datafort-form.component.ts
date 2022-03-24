import { NrDatafort } from './../models/nr-datafort';
import { Cp2020DatafortRandomGeneratorService } from './../services/cp2020-datafort-random-generator.service';
import { svgAsPngUri } from 'save-svg-as-png';
import { jsPDF } from 'jspdf';
import { Cp2020DatafortSvgBuilderService } from './../services/cp2020-datafort-svg-builder.service';
import { NrMapDefaults } from './../enums/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { SaveFileService } from './../../../services/file-services/save-file/save-file.service';
import { FileLoaderService } from './../../../services/file-services/file-loader/file-loader.service';
import { faRedo, faSave, faFilePdf, faImage, faUpload, faDice, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { Cp2020AppFiles } from './../../../services/file-services/enum/cp2020-app-files';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { Component, OnInit } from '@angular/core';
import { NrDatafortRefData } from '../models/nr-datafort-ref-data';

@Component({
  selector: 'cs-cp2020-datafort-form',
  templateUrl: './cp2020-datafort-form.component.html',
  styleUrls: ['./cp2020-datafort-form.component.css']
})
export class Cp2020DatafortFormComponent implements OnInit {
  faRedo = faRedo;
  faSave = faSave;
  faFilePdf = faFilePdf;
  faImage = faImage;
  faFileImage = faFileImage;
  faUpload = faUpload;
  faDice = faDice;

  datafortRefData: NrDatafortRefData;
  datafort: Cp2020NrDatafort;

  includeData = true;

  get fileName(): string {
    if(this.datafort && this.datafort.name !== '') {
      return this.datafort.name.replace(/[^\w\s]/gi, '').replace(/[^\w]/gi, '_')
    }
    return 'cp2020_datafort';
  }

  constructor(private dataService: DataService,
    private datafortBuilderService: Cp2020DatafortBuilderService,
    private svgBuilderService: Cp2020DatafortSvgBuilderService,
    private randomGeneratorService: Cp2020DatafortRandomGeneratorService,
    private loadService: FileLoaderService,
    private saveService: SaveFileService) { }

  ngOnInit(): void {
    this.dataService.GetJson(Cp2020AppFiles.CP2020_DATAFORT_REF_DATA)
    .subscribe(data => {
      this.datafortRefData = data;
    });
    this.datafortBuilderService.datafort
    .subscribe(datafort => {
      this.datafort = new Cp2020NrDatafort(datafort);
    });
  }

  reset() {
    this.datafortBuilderService.reset();
  }

  generate() {
    const df = this.randomGeneratorService.generate(this.datafortRefData);
    this.datafortBuilderService.update(df);
  }

  printPNG() {
    var parser = new DOMParser();
    const svg = parser.parseFromString(this.svgBuilderService.generate(this.datafort, NrMapDefaults.GRID_SIZE, this.includeData), 'image/svg+xml');
    this.saveService.SaveAsPng(this.fileName, svg.getElementById('datafort-cp2020'));
  }

  printSVG() {
    const svg = this.svgBuilderService.generate(this.datafort, NrMapDefaults.GRID_SIZE, this.includeData);
    this.saveService.SaveAsFile(this.fileName, svg, 'svg');
  }

  uploadJSON($event) {
    this.loadService
      .importJSON<NrDatafort>($event.target.files[0])
      .subscribe((data) => this.datafortBuilderService.update(data) );
  }

  saveJSON() {
    this.saveService.SaveAsFile(this.fileName,JSON.stringify(this.datafort),'json');
  }

}
