import { Cp2020weaponComponent } from './cp2020weapon/cp2020weapon.component';
import { Cp2020weapontableComponent } from './cp2020weapontable/cp2020weapontable.component';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    Cp2020weapontableComponent,
    Cp2020weaponComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  exports: [
    Cp2020weapontableComponent,
    Cp2020weaponComponent
  ]
})
export class Cp2020weaponsModule { }
