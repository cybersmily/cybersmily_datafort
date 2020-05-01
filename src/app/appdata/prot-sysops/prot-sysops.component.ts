import { Sysop } from '../../shared/models/character';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prot-sysops',
  templateUrl: './prot-sysops.component.html',
  styleUrls: ['./prot-sysops.component.css']
})
export class ProtSysopsComponent implements OnInit {

  sysopsList: Sysop[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getSysopList();
  }

  private getSysopList(): void {
    this.dataService
      .GetJson('/json/data/proteus-sysop.json')
      .subscribe(
        resultObj => {
          this.sysopsList = resultObj.sysops;
        },
        error => console.log( 'Error :: ' + error)
      );
  }

}
