import { DataService } from './../../services/file-services/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020LifestyleComponent } from './cp2020-lifestyle/cp2020-lifestyle.component';



@NgModule({
  declarations: [Cp2020LifestyleComponent],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DataService
  ],
  exports: [
    Cp2020LifestyleComponent
  ]
})
export class Cp2020LifestyleModule { }
