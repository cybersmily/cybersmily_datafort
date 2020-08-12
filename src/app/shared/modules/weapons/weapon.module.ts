import { CommonUiModule } from './../common-ui/common-ui.module';
import { WeaponcardComponent } from './weaponcard/weaponcard.component';
import {  WeaponcardcolumnComponent } from './weaponcardcolumn/weaponcardcolumn.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    CommonUiModule
  ],
  exports: [
    WeaponcardcolumnComponent,
    WeaponcardComponent,
    CommonUiModule
  ],
  declarations: [
    WeaponcardComponent,
    WeaponcardcolumnComponent
  ]
})
export class WeaponModule { }
