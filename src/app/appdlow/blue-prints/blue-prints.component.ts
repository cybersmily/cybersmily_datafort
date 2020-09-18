import { JsonDataFiles } from './../../shared/json-data-files';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-blue-prints',
  templateUrl: './blue-prints.component.html',
  styleUrls: ['./blue-prints.component.css']
})
export class BluePrintsComponent implements OnInit {
  blueprints: Array<any> = new Array<any>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService
    .GetJson(JsonDataFiles.BLUEPRINTs_JSON)
    .subscribe( data => {
      this.blueprints = data;
    });
  }
}
