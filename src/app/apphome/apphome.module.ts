import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [CommonModule, CommonUiModule],
  exports: [HomeComponent],
  declarations: [HomeComponent],
})
export class ApphomeModule {}
