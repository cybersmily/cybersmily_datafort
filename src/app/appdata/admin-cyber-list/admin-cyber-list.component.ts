import { CyberDataService } from './../../shared/cp2020/cp2020-cyberware/services';
import { DataCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SaveFileService } from './../../shared/services/save-file.service';
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

  completed = false;

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

  update() {
    this.cyberData.update(this.cyberwareList);
  }

  add() {
    this.cyberData.add(new DataCyberware(this.newCyber));
    this.newCyber = new DataCyberware();
  }

  delete(cyber: string, type: string, subtype: string) {
    this.cyberData.delete(cyber, type, subtype);
  }

   filterCompleted(page: number): boolean {
    if ( this.completed && page && page !== 0) {
      return false;
    }
    return true;
  }

}
