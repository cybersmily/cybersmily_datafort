import { DataService } from './../../services/file-services';
import { DiceService } from './../../services/dice/dice.service';
import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020VehicleTableComponent } from './cp2020-vehicle-table/cp2020-vehicle-table.component';
import { Cp2020VehicleDetailsComponent } from './cp2020-vehicle-details/cp2020-vehicle-details.component';



@NgModule({
  declarations: [
    Cp2020VehicleTableComponent,
    Cp2020VehicleDetailsComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  exports: [
    Cp2020VehicleTableComponent,
    Cp2020VehicleDetailsComponent
  ],
  providers: [
    DiceService,
    DataService
  ]
})
export class Cp2020VehiclesModule { }
