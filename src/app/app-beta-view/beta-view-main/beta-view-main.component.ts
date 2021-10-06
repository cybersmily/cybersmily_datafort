import { Cp2020PlayerRole } from './../../shared/cp2020/cp2020-role/models/cp2020-player-role';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-beta-view-main',
  templateUrl: './beta-view-main.component.html',
  styleUrls: ['./beta-view-main.component.css']
})
export class BetaViewMainComponent implements OnInit {

  selectRole: Cp2020PlayerRole = new Cp2020PlayerRole();
  isIU: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  update($event: Cp2020PlayerRole){
    this.selectRole = new Cp2020PlayerRole();
    this.selectRole.import($event);
  }

}
