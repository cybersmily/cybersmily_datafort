import { DataService } from './../shared/services/file-services';
import { Cp2020ArmorModule } from './../shared/cp2020/cp2020-armor/cp2020-armor.module';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { AppFashionGeneratorRoutingModule } from './app-fashion-generator-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionGeneratorComponent } from './fashion-generator/fashion-generator.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    Cp2020ArmorModule,
    AppFashionGeneratorRoutingModule
  ],
  providers: [
    DiceService,
    DataService
  ],
  declarations: [
    FashionGeneratorComponent
  ]
})
export class AppFashionGeneratorModule { }
