import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedWeaponsDisplayComponent } from './components/cp-red-weapons-display/cp-red-weapons-display.component';

@NgModule({
  declarations: [CpRedWeaponsDisplayComponent],
  exports: [CpRedWeaponsDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedWeaponsModule {}
