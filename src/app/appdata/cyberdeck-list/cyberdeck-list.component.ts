import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cp2020Cyberdeck } from './../../shared/cp2020/cp2020-netrun-gear/models/cp2020-cyberdeck';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cyberdeck-list',
  templateUrl: './cyberdeck-list.component.html',
  styleUrls: ['./cyberdeck-list.component.css']
})
export class CyberdeckListComponent implements OnInit {
  deckList$: Observable<Array<Cp2020Cyberdeck>>;
  filters = {
    type: '',
    name: '',
    speed: null,
    mu: null,
    cost: -1,
    options: '',
    description: '',
    source: '',
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.deckList$ = this.dataService.GetJson(JsonDataFiles.CP2020_CYBERDECK_LIST_JSON)
    .pipe( map((data:Array<Cp2020Cyberdeck>)=> data.sort((a, b) => a.name.localeCompare(b.name))));
  }

}
