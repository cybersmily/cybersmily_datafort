import { CpRedLifepathJumpstartComponent } from './cp-red-lifepath-jumpstart/cp-red-lifepath-jumpstart.component';
import { CpRedLifepathCoreComponent } from './cp-red-lifepath-core/cp-red-lifepath-core.component';
import { CPRedLifePathService } from './services/c-p-red-life-path.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    CpRedLifepathCoreComponent,
    CpRedLifepathJumpstartComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DiceService,
    CPRedLifePathService
  ],
  exports: [
    CpRedLifepathCoreComponent,
    CpRedLifepathJumpstartComponent
  ]
})
export class CPRedLifepathModule { }
