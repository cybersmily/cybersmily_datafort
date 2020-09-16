import { CorporationCardComponent } from './corporation-card/corporation-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeepSectionRoutingModule } from './peepsection-routing.module';
import { NpcsComponent } from './npcs/npcs.component';
import { CorporationsComponent } from './corporations/corporations.component';
import { NpcsModule } from '../shared/modules/npcs/npcs.module';
import { GangsComponent } from './gangs/gangs.component';

@NgModule({
  imports: [
    CommonModule,
    PeepSectionRoutingModule,
    NpcsModule
  ],
  declarations: [
    NpcsComponent,
    CorporationsComponent,
    CorporationCardComponent,
    GangsComponent
  ]
})
export class PeepSectionModule { }
