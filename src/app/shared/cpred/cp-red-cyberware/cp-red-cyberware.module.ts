import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedCyberListComponent } from './components/cp-red-cyber-list/cp-red-cyber-list.component';
import { CpRedCyberwareDisplayComponent } from './components/cp-red-cyberware-display/cp-red-cyberware-display.component';

@NgModule({
  declarations: [CpRedCyberListComponent, CpRedCyberwareDisplayComponent],
  exports: [CpRedCyberListComponent, CpRedCyberwareDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedCyberwareModule {}
