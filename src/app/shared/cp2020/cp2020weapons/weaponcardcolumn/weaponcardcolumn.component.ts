import { WeaponcardComponent } from './../weaponcard/weaponcard.component';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import { WeaponGroup, CpWeapon } from '../models';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'csdata-weaponcardcolumn',
  templateUrl: './weaponcardcolumn.component.html',
  styleUrls: ['./weaponcardcolumn.component.css']
})
export class WeaponcardcolumnComponent implements OnInit {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;

  @ViewChild('accordion', {static: false}) accordion: AccordionComponent;

  @Input()
  weapons: WeaponGroup[];

  constructor() { }

  ngOnInit() {
  }
}
