import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { CpRedStatsComponent } from './components/cp-red-stats/cp-red-stats.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPRedStatComponent } from './components/cp-red-stat/cp-red-stat.component';
import { CPRedStatEditorComponent } from './components/cp-red-stat-editor/cp-red-stat-editor.component';
import { CpRedStatsEditorComponent } from './components/cp-red-stats-editor/cp-red-stats-editor.component';

@NgModule({
  declarations: [
    CPRedStatComponent,
    CPRedStatEditorComponent,
    CpRedStatsComponent,
    CpRedStatsEditorComponent,
  ],
  imports: [CommonModule, CommonUiModule],
  exports: [
    CPRedStatComponent,
    CPRedStatEditorComponent,
    CpRedStatsComponent,
    CpRedStatsEditorComponent,
  ],
})
export class CPRedStatsModule {}
