import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { AppFashionGeneratorRoutingModule } from './app-fashion-generator-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionInputComponent } from './fashion-input/fashion-input.component';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionGeneratorComponent } from './fashion-generator/fashion-generator.component';
import { FashionSelectorComponent } from './fashion-selector/fashion-selector.component';
import { FashionClothesSelectorComponent } from './fashion-clothes-selector/fashion-clothes-selector.component';
import { FashionOptionsSelectorComponent } from './fashion-options-selector/fashion-options-selector.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    AppFashionGeneratorRoutingModule
  ],
  exports: [
    FashionGeneratorComponent,
    FashionInputComponent,
    FashionListComponent,
    FashionSelectorComponent,
    FashionClothesSelectorComponent,
    FashionOptionsSelectorComponent
  ],
  providers: [
    DiceService
  ],
  declarations: [
    FashionInputComponent,
    FashionListComponent,
    FashionGeneratorComponent,
    FashionSelectorComponent,
    FashionClothesSelectorComponent,
    FashionOptionsSelectorComponent
  ]
})
export class AppFashionGeneratorModule { }
