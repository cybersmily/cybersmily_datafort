import { JsonDataFiles } from './../../shared/services/file-services';
import { MaxMetalWeaponMount } from '../../shared/cp2020/cp2020weapons/models';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-mmmounts',
  templateUrl: './mmmounts.component.html',
  styleUrls: ['./mmmounts.component.css']
})
export class MmmountsComponent implements OnInit {

  mounts: MaxMetalWeaponMount[] = new Array<MaxMetalWeaponMount>();
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetJson(JsonDataFiles.CP2020_MAXMETAL_MOUNTS_JSON)
    .subscribe( data => {
      this.mounts = data.mounts;
    });
  }

}
