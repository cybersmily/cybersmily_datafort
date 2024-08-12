import { DataListModule } from './../../modules/data-list/data-list.module';
import { Cp2020DamageCalculatorService } from './services/cp2020-damage-calculator/cp2020-damage-calculator.service';
import {
  ClothingListPdfService,
  ArmorRandomGenSettingsService,
  ArmorListService,
  ArmorDataAttributesService,
  ArmorGeneratorService,
} from './services';
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
import { Cp2020ArmorDetailComponent } from './cp2020-armor-detail/cp2020-armor-detail.component';
import { ArmorSettingsComponent } from './armor-settings/armor-settings.component';
import { Cp2020OpponentArmorListComponent } from './cp2020-opponent-armor-list/cp2020-opponent-armor-list.component';
import { Cp2020ArmorSuiteGeneratorComponent } from './cp2020-armor-suite-generator/cp2020-armor-suite-generator.component';
import { Cp2020CoverSectionComponent } from './cp2020-cover-section/cp2020-cover-section.component';
import { CombatTrackerService } from './../../../app-cmbt-track/services/combat-tracker.service';

@NgModule({
  declarations: [
    Cp2020ArmorTableComponent,
    Cp2020ArmorSectionComponent,
    Cp2020ClothingListComponent,
    Cp2020ArmorDetailComponent,
    ArmorSettingsComponent,
    Cp2020SourceArmorListComponent,
    Cp2020OpponentArmorListComponent,
    Cp2020ArmorSuiteGeneratorComponent,
    Cp2020CoverSectionComponent,
  ],
  imports: [CommonModule, CommonUiModule, PipesModule, DataListModule],
  providers: [
    DiceService,
    ArmorDataListService,
    ArmorCalculatorService,
    ArmorGeneratorService,
    ArmorDataAttributesService,
    ArmorListService,
    ArmorRandomGenSettingsService,
    ClothingListPdfService,
    Cp2020DamageCalculatorService,
    CombatTrackerService,
  ],
  exports: [
    Cp2020ArmorTableComponent,
    Cp2020ArmorSectionComponent,
    Cp2020ClothingListComponent,
    Cp2020ArmorDetailComponent,
    ArmorSettingsComponent,
    Cp2020SourceArmorListComponent,
    Cp2020OpponentArmorListComponent,
    Cp2020CoverSectionComponent,
  ],
})
export class Cp2020ArmorModule {}
