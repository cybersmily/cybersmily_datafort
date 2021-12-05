import { NrMapDefaults } from './../enums/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { SaveFileService } from './../../../services/file-services/save-file/save-file.service';
import { FileLoaderService } from './../../../services/file-services/file-loader/file-loader.service';
import { faRedo, faSave, faFilePdf, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { LocalStorageManagerService } from './../../../services/local-storage-manager/local-storage-manager.service';
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
  faUpload = faUpload;

  datafortRefData: NrDatafortRefData;
  datafort: Cp2020NrDatafort;

  constructor(private dataService: DataService,
    private datafortBuilderService: Cp2020DatafortBuilderService,
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

  printPDF() {}
  printSVG() {}
  uploadJSON($event) {
    this.loadService
      .importJSON($event.target.files[0])
      .subscribe((data) => this.datafortBuilderService.update(data) );
  }

  saveJSON() {
    this.saveService.SaveAsFile('cp2020_datafort',JSON.stringify(this.datafort),'json');
  }

}
