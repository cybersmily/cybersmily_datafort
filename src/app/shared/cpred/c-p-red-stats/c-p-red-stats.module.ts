import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPRedStatComponent } from './c-p-red-stat/c-p-red-stat.component';
import { CPRedStatEditorComponent } from './c-p-red-stat-editor/c-p-red-stat-editor.component';



@NgModule({
  declarations: [CPRedStatComponent, CPRedStatEditorComponent],
  imports: [
    CommonModule
  ]
})
export class CPRedStatsModule { }
