import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { CpRedCharacterStatsComponent } from './cp-red-character-stats/cp-red-character-stats.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPRedStatComponent } from './cp-red-stat/cp-red-stat.component';
import { CPRedStatEditorComponent } from './cp-red-stat-editor/cp-red-stat-editor.component';

@NgModule({
  declarations: [
    CPRedStatComponent,
    CPRedStatEditorComponent,
    CpRedCharacterStatsComponent,
  ],
  imports: [CommonModule, CommonUiModule],
  exports: [
    CPRedStatComponent,
    CPRedStatEditorComponent,
    CpRedCharacterStatsComponent,
  ],
})
export class CPRedStatsModule {}
