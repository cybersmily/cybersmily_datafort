import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [HomeComponent]
})
export class ApphomeModule { }
