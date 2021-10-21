import { LifepathFamilyComponent } from './lifepath-family/lifepath-family.component';
import { LifepathEventsComponent } from './lifepath-events/lifepath-events.component';
import { LifepathEthnicityComponent } from './lifepath-ethnicity/lifepath-ethnicity.component';
import { LifepathChartComponent } from './lifepath-chart/lifepath-chart.component';
import { DataService } from './../../services/file-services/data.service';
import { DiceService } from './../../services/dice/dice.service';
import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020LifepathSectionComponent } from './cp2020-lifepath-section/cp2020-lifepath-section.component';



@NgModule({
  declarations: [
    LifepathChartComponent,
    LifepathEthnicityComponent,
    LifepathEventsComponent,
    LifepathFamilyComponent,
    Cp2020LifepathSectionComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    DiceService,
    DataService
  ],
  exports: [
    LifepathChartComponent,
    LifepathEthnicityComponent,
    LifepathEventsComponent,
    LifepathFamilyComponent,
    Cp2020LifepathSectionComponent
  ]
})
export class Cp2020LifepathModule { }
