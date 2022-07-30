import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedWoundsDisplayComponent } from './components/cp-red-wounds-display/cp-red-wounds-display.component';
import { CpRedInjuriesDisplayComponent } from './components/cp-red-injuries-display/cp-red-injuries-display.component';
import { CpRedAddictionsDisplayComponent } from './components/cp-red-addictions-display/cp-red-addictions-display.component';

@NgModule({
  declarations: [CpRedWoundsDisplayComponent, CpRedInjuriesDisplayComponent, CpRedAddictionsDisplayComponent],
  exports: [CpRedWoundsDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedWoundsModule {}
