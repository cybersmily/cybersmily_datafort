import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProgramOption } from './../../shared/cp2020/cp2020-netrun-gear/models/program-option';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { Component, OnInit } from '@angular/core';
import { Program } from '../../shared/cp2020/cp2020-netrun-gear/models';

@Component({
  selector: 'cs-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  programList$: Observable<Array<Program>>;
  optionsList: any = {classes: new Array<ProgramOption>(), options: new Array<ProgramOption>()};
  filters = {
    class: '',
    name: '',
    str: null,
    mu: null,
    cost: -1,
    options: '',
    description: '',
    source: '',
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.programList$ = this.dataService
    .GetJson(JsonDataFiles.CP2020_PROGRAM_LIST_JSON)
    .pipe( map( data => data.sort((a,b) => a.class.localeCompare(b.class))));
  }

}
