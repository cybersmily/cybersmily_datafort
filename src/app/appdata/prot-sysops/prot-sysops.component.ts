import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Sysop } from '../../shared/models/character';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prot-sysops',
  templateUrl: './prot-sysops.component.html',
  styleUrls: ['./prot-sysops.component.css']
})
export class ProtSysopsComponent implements OnInit {

  sysopsList: Sysop[];

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Proteus Sysop List',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Proteus Sysop List is a complied list of gear from the Netrunner TCG expansion converted into Cyberpunk 2020 stats.'
    );
    this.getSysopList();
  }

  private getSysopList(): void {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_PROTEUS_SYSOPS_JSON)
      .subscribe(
        resultObj => {
          this.sysopsList = resultObj.sysops;
        },
        error => console.log( 'Error :: ' + error)
      );
  }

}
