import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SaveFileService } from './../../shared/services/save-file.service';
import { CyberDataService } from './../../shared/services/data/cyber-data.service';
import { DataCyberware } from './../../shared/models/cyberware/data-cyberware';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-admin-cyber-list',
  templateUrl: './admin-cyber-list.component.html',
  styleUrls: ['./admin-cyber-list.component.css']
})
export class AdminCyberListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;

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

  newCyber: DataCyberware = new DataCyberware();

  constructor(private cyberData: CyberDataService) { }

  ngOnInit() {
    this.cyberData.CyberwareList
    .subscribe( data => {
      this.cyberwareList = data;
    });
  }

  save() {
    this.cyberData.save();
  }

  add() {
    this.cyberData.add(this.newCyber);
  }

  delete(cyber: string) {
    this.cyberData.delete(cyber);
  }

}
