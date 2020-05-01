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

  constructor(private cyberData: CyberDataService) { }

  ngOnInit() {
    this.cyberData.CyberwareList
    .subscribe( data => {
      this.cyberwareList = data;
    });
  }


}
