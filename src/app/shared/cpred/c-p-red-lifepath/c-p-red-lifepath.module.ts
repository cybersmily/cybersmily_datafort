import { CpRedLifepathJumpstartComponent } from './cp-red-lifepath-jumpstart/cp-red-lifepath-jumpstart.component';
import { CpRedLifepathCoreComponent } from './cp-red-lifepath-core/cp-red-lifepath-core.component';
import { CPRedLifePathService } from './services/c-p-red-life-path.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedLifepathDisplayComponent } from './components/cp-red-lifepath-display/cp-red-lifepath-display.component';
@NgModule({
  declarations: [
    CpRedLifepathCoreComponent,
    CpRedLifepathJumpstartComponent,
    CpRedLifepathDisplayComponent,
  ],
  imports: [CommonModule, CommonUiModule],
  providers: [CPRedLifePathService, DiceService],
  exports: [
    CpRedLifepathCoreComponent,
    CpRedLifepathJumpstartComponent,
    CpRedLifepathDisplayComponent,
  ],
})
export class CPRedLifepathModule {}
