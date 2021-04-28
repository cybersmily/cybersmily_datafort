import { RedJumpkitLifepathService } from './../services/cprlifepath/red-jumpkit-lifepath.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPRedLifepathFormComponent } from './c-p-red-lifepath-form/c-p-red-lifepath-form.component';
import { CPRedLifePathGeneratorComponent } from './services/c-p-red-life-path-generator/c-p-red-life-path-generator.component';



@NgModule({
  declarations: [
    CPRedLifepathFormComponent,
    CPRedLifePathGeneratorComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DiceService,
    RedJumpkitLifepathService
  ],
  exports: [
    CPRedLifepathFormComponent
  ]
})
export class CPRedLifepathModule { }
