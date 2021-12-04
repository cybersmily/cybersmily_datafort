import { faRedo } from '@fortawesome/free-solid-svg-icons';
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

  datafortRefData: NrDatafortRefData;

  constructor(private dataService: DataService, private datafortBuilderService: Cp2020DatafortBuilderService) { }

  ngOnInit(): void {
    this.dataService.GetJson(Cp2020AppFiles.CP2020_DATAFORT_REF_DATA)
    .subscribe(data => {
      this.datafortRefData = data;
    })
  }

  reset() {
    this.datafortBuilderService.reset();
  }

}
