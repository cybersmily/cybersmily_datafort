import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedWoundsDisplayComponent } from './components/cp-red-wounds-display/cp-red-wounds-display.component';

@NgModule({
  declarations: [CpRedWoundsDisplayComponent],
  exports: [CpRedWoundsDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedWoundsModule {}
