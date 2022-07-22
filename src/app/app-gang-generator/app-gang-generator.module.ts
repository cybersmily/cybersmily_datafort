import { GangGeneratorModule } from './../shared/modules/gang-generator/gang-generator.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppGangGeneratorRoutingModule } from './app-gang-generator-routing.module';
import { GangGeneratorMainComponent } from './gang-generator-main/gang-generator-main.component';

@NgModule({
  declarations: [GangGeneratorMainComponent],
  imports: [CommonModule, AppGangGeneratorRoutingModule, GangGeneratorModule],
})
export class AppGangGeneratorModule {}
