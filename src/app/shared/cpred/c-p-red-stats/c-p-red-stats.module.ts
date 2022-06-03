import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { CpRedCharacterStatsComponent } from './cp-red-character-stats/cp-red-character-stats.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPRedStatComponent } from './cp-red-stat/cp-red-stat.component';
import { CPRedStatEditorComponent } from './cp-red-stat-editor/cp-red-stat-editor.component';
import { CpRedStatsEditorComponent } from './cp-red-stats-editor/cp-red-stats-editor.component';

@NgModule({
  declarations: [
    CPRedStatComponent,
    CPRedStatEditorComponent,
    CpRedCharacterStatsComponent,
    CpRedStatsEditorComponent,
  ],
  imports: [CommonModule, CommonUiModule],
  exports: [
    CPRedStatComponent,
    CPRedStatEditorComponent,
    CpRedCharacterStatsComponent,
    CpRedStatsEditorComponent,
  ],
})
export class CPRedStatsModule {}
