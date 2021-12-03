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

  datafortRefData: NrDatafortRefData;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.GetJson(Cp2020AppFiles.CP2020_DATAFORT_REF_DATA)
    .subscribe(data => {
      console.log('read ref data', data);
      this.datafortRefData = data;
    })
  }

}
