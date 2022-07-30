import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedArmorDisplayComponent } from './components/cp-red-armor-display/cp-red-armor-display.component';

@NgModule({
  declarations: [CpRedArmorDisplayComponent],
  exports: [CpRedArmorDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedArmorModule {}
