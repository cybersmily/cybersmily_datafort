import { WpnListComponent } from './wpn-list/wpn-list.component';
import { AdminWpnListComponent } from './admin-wpn-list/admin-wpn-list.component';
import { AdminCyberListComponent } from './admin-cyber-list/admin-cyber-list.component';
import { CyberListComponent } from './cyber-list/cyber-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoregunsComponent,
  ProtGearComponent,
  Chrome2Component,
  InmediaComponent,
  ProtProgComponent,
  ProtSysopsComponent } from './index';


export const dataRoutes: Routes = [
    {path: '', children: [
      {path: 'chrome2', component: Chrome2Component},
      {path: 'inmedia', component: InmediaComponent},
      {path: 'moreguns', component: MoregunsComponent},
      {path: 'proteus', children: [
        {path: 'prog', component: ProtProgComponent},
        {path: 'gear', component: ProtGearComponent},
        {path: 'sysops', component: ProtSysopsComponent},
        {path: '', redirectTo: 'proteus/prog', pathMatch: 'full'}
      ]},
      {path: 'skills', component: SkillListComponent},
      {path: 'roles', component: RoleListComponent},
      {path: 'cyber', component: CyberListComponent},
      {path: 'wpns', component: WpnListComponent },
      {path: 'admincyber', component: AdminCyberListComponent},
      {path: 'adminwpn', component: AdminWpnListComponent}
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(dataRoutes)],
  exports: [RouterModule]
})
export class DataSectionRoutingModule { }
