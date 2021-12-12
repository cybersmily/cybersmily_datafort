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
  deckList: Cp2020Cyberdeck[] = new Array<Cp2020Cyberdeck>();
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
    this.dataService.GetJson(JsonDataFiles.CP2020_CYBERDECK_LIST_JSON)
    .subscribe(decklist => {
      this.deckList = decklist.map( deck => new Cp2020Cyberdeck(deck)).sort((a,b) => a.name.localeCompare(b.name));
    });
  }

}
