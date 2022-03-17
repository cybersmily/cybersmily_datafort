import { BodegasGeneratorService } from './services/bodegas-generator.service';
import { VenditGeneratorService } from './services/vendit-generator.service';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { NightMarketGeneratorService } from './services/night-market-generator.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NightMarketGeneratorService,
    DataService,
    DiceService,
    VenditGeneratorService,
    BodegasGeneratorService
  ]
})
export class CPRedEconomyModule { }
