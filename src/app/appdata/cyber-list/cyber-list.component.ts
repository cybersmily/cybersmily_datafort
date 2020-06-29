import { SeoService } from './../../shared/services/seo/seo.service';
import { DataCyberware } from '../../shared/models/cyberware/data-cyberware';
import { CyberDataService } from './../../shared/services/data/cyber-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cyber-list',
  templateUrl: './cyber-list.component.html',
  styleUrls: ['./cyber-list.component.css']
})
export class CyberListComponent implements OnInit {

  searchFilter = {
      type: '',
      subtype: '',
      name: '',
      desc: '',
      notes: '',
      hc: '',
      surg: '',
      source: ''
    };

  cyberwareList: Array<DataCyberware> = new Array<DataCyberware>();

  constructor(private cyberData: CyberDataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Cyberware List',
      '2001-09, Cybersmily\'s Datafort Cyberpunk 2020 Cyberware List from all sources and search capability.'
    );
    this.cyberData.CyberwareList
    .subscribe( data => {
      this.cyberwareList = data;
    });
  }


}
