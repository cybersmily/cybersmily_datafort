import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedArmorDisplayComponent } from './components/cp-red-armor-display/cp-red-armor-display.component';
import { CpRedArmorEditorComponent } from './components/cp-red-armor-editor/cp-red-armor-editor.component';
import { CpRedArmorRowComponent } from './components/cp-red-armor-row/cp-red-armor-row.component';

@NgModule({
  declarations: [CpRedArmorDisplayComponent, CpRedArmorEditorComponent, CpRedArmorRowComponent],
  exports: [CpRedArmorDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedArmorModule {}
