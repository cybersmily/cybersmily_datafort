import { CyberDataService } from './../shared/cp2020/cp2020-cyberware/services';
import { Cp2020CyberwareModule } from './../shared/cp2020/cp2020-cyberware/cp2020-cyberware.module';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { PipesModule } from './../shared/pipes/pipes.module';
import { DataService } from './../shared/services/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataSectionRoutingModule } from './datasection-routing.module';

import { Chrome2Component} from './chrome2/chrome2.component';
import { ProtSysopsComponent } from './prot-sysops/prot-sysops.component';
import { ProtProgComponent } from './prot-prog/prot-prog.component';
import { ProtGearComponent } from './prot-gear/prot-gear.component';
import { InmediaComponent } from './inmedia/inmedia.component';
import { MoregunsComponent } from './moreguns/moreguns.component';
import { WeaponModule } from './../shared/modules/weapons/weapon.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CyberListComponent } from './cyber-list/cyber-list.component';
import { AdminCyberListComponent } from './admin-cyber-list/admin-cyber-list.component';
import { AdminWpnListComponent } from './admin-wpn-list/admin-wpn-list.component';
import { WpnListComponent } from './wpn-list/wpn-list.component';


@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    WeaponModule,
    Cp2020CyberwareModule,
    DataSectionRoutingModule,
    PipesModule
  ],
  declarations: [
    Chrome2Component,
    MoregunsComponent,
    InmediaComponent,
    ProtProgComponent,
    ProtSysopsComponent,
    ProtGearComponent,
    SkillListComponent,
    RoleListComponent,
    CyberListComponent,
    AdminCyberListComponent,
    AdminWpnListComponent,
    WpnListComponent],
  providers: [
    DataService,
    CyberDataService
  ]
})
export class DataSectionModule { }
