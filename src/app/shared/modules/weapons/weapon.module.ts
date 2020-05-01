import { WeaponcardComponent } from './weaponcard/weaponcard.component';
import {  WeaponcardcolumnComponent } from './weaponcardcolumn/weaponcardcolumn.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    FontAwesomeModule
  ],
  exports: [
    WeaponcardcolumnComponent,
    WeaponcardComponent,
    FontAwesomeModule
  ],
  declarations: [
    WeaponcardComponent,
    WeaponcardcolumnComponent
  ]
})
export class WeaponModule { }
