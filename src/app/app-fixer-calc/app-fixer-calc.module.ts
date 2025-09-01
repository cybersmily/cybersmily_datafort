import { Cp2020ContactsModule } from './../shared/cp2020/cp2020-contacts/cp2020-contacts.module';
import { DataService } from './../shared/services/file-services';
import { DiceService } from './../shared/services/dice/dice.service';
import { SaveFileService } from './../shared/services/file-services';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';

import { AppFixerCalcRoutingModule } from './app-fixer-calc-routing.module';
import { FixerCalcMainComponent } from './fixer-calc-main/fixer-calc-main.component';
@NgModule({
  declarations: [FixerCalcMainComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppFixerCalcRoutingModule,
    Cp2020ContactsModule,
  ],
  providers: [SaveFileService, DiceService],
})
export class AppFixerCalcModule {}
