import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopSectionRoutingModule } from './shopsection-routing.module';
import { ShopCyberwareComponent } from './shop-cyberware/shop-cyberware.component';
import { ShopGearComponent } from './shop-gear/shop-gear.component';
import { ShopOtherComponent } from './shop-other/shop-other.component';

import { CyberwareModule } from './../shared/modules/cyberware/cyberware.module';
import { GearModule } from './../shared/modules/gear/gear.module';

@NgModule({
  imports: [
    CommonModule,
    CyberwareModule,
    GearModule,
    ShopSectionRoutingModule
  ],
  declarations: [
    ShopCyberwareComponent,
    ShopGearComponent,
    ShopOtherComponent ]
})
export class ShopSectionModule { }
