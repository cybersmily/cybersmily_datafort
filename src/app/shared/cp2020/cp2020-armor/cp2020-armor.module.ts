import {
  ClothingListPdfService,
  ArmorRandomGenSettingsService,
  ArmorListService,
  ArmorDataAttributesService,
  ArmorGeneratorService } from './services';
import { PipesModule } from './../../pipes/pipes.module';
import { ArmorCalculatorService } from './services/armor-calculator/armor-calculator.service';
import { ArmorDataListService } from './services/armor-data-list/armor-data-list.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020SourceArmorListComponent } from './cp2020-source-armor-list/cp2020-source-armor-list.component';
import { Cp2020ArmorTableComponent } from './cp2020-armor-table/cp2020-armor-table.component';
import { Cp2020ArmorSectionComponent } from './cp2020-armor-section/cp2020-armor-section.component';
import { Cp2020ClothingListComponent } from './cp2020-clothing-list/cp2020-clothing-list.component';
import { Cp2020ArmorListComponent } from './cp2020-armor-list/cp2020-armor-list.component';
import { Cp2020ArmorNewComponent } from './cp2020-armor-new/cp2020-armor-new.component';
import { Cp2020ArmorDetailComponent } from './cp2020-armor-detail/cp2020-armor-detail.component';
import { ArmorSettingsComponent } from './armor-settings/armor-settings.component';
import { Cp2020OpponenentListComponent } from './cp2020-opponenent-list/cp2020-opponenent-list.component';



@NgModule({
  declarations: [
    Cp2020ArmorTableComponent,
    Cp2020ArmorSectionComponent,
    Cp2020ClothingListComponent,
    Cp2020ArmorListComponent,
    Cp2020ArmorNewComponent,
    Cp2020ArmorDetailComponent,
    ArmorSettingsComponent,
    Cp2020SourceArmorListComponent,
    Cp2020OpponenentListComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    DiceService,
    ArmorDataListService,
    ArmorCalculatorService,
    ArmorGeneratorService,
    ArmorDataAttributesService,
    ArmorListService,
    ArmorRandomGenSettingsService,
    ClothingListPdfService
  ],
  exports: [
    Cp2020ArmorTableComponent,
    Cp2020ArmorSectionComponent,
    Cp2020ClothingListComponent,
    Cp2020ArmorListComponent,
    Cp2020ArmorNewComponent,
    Cp2020ArmorDetailComponent,
    ArmorSettingsComponent,
    Cp2020SourceArmorListComponent,
    Cp2020OpponenentListComponent
  ]
})
export class Cp2020ArmorModule { }
