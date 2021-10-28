import { Cp2020ArmorBlock } from './../../shared/cp2020/cp2020-armor/models/cp2020-armor-block';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-beta-view-main',
  templateUrl: './beta-view-main.component.html',
  styleUrls: ['./beta-view-main.component.css']
})
export class BetaViewMainComponent implements OnInit {

  isIU: boolean = false;

  armorBlock: Cp2020ArmorBlock = new Cp2020ArmorBlock();

  constructor() { }

  ngOnInit(): void {
  }

  update($event: Cp2020ArmorBlock){
    this.armorBlock = new Cp2020ArmorBlock($event);
  }

}
