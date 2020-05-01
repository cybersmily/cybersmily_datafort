import { MaxMetalWeaponMount } from '../../shared/models/weapon';
import { DataService } from './../../shared/services/data.service';
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
    this.dataService.GetJson('/json/apps/maxmetal/mmweaponmounts.json').subscribe( data => {
      this.mounts = data.mounts;
    });
  }

}
