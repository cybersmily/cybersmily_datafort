import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DlowSectionRoutingModule } from './dlowsection-routing.module';
import { Cc3mapsComponent } from './cc3maps/cc3maps.component';
import { JpgmapsComponent } from './jpgmaps/jpgmaps.component';

@NgModule({
  imports: [
    CommonModule,
    DlowSectionRoutingModule
  ],
  declarations: [Cc3mapsComponent, JpgmapsComponent]
})
export class DlowSectionModule { }
