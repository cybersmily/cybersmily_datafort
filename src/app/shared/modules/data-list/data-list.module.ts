import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from './data-list/data-list.component';

@NgModule({
  declarations: [DataListComponent],
  exports: [DataListComponent],
  imports: [CommonModule, CommonUiModule, PipesModule],
})
export class DataListModule {}
