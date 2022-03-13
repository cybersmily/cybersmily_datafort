import { Observable } from 'rxjs';
import { JsonDataFiles, DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-blue-prints',
  templateUrl: './blue-prints.component.html',
  styleUrls: ['./blue-prints.component.css']
})
export class BluePrintsComponent implements OnInit {
  blueprints$: Observable<Array<any>>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.blueprints$ = this.dataService
    .GetJson(JsonDataFiles.BLUEPRINTs_JSON);
  }
}
