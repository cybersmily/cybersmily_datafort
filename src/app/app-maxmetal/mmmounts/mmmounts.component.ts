import { MaxMetalWeaponMount } from '../../shared/cp2020/cp2020weapons/models';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-mmmounts',
    templateUrl: './mmmounts.component.html',
    styleUrls: ['./mmmounts.component.css'],
    standalone: false
})
export class MmmountsComponent implements OnInit {
  mounts: MaxMetalWeaponMount[] = new Array<MaxMetalWeaponMount>();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .GetJson<{ mounts: Array<MaxMetalWeaponMount> }>(
        JsonDataFiles.CP2020_MAXMETAL_MOUNTS_JSON
      )
      .subscribe((data) => {
        this.mounts = data.mounts;
      });
  }
}
