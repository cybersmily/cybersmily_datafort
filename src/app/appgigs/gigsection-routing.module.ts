import { NewsadminComponent } from './newsadmin/newsadmin.component';
import { NewsComponent } from './news/news.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const gigRoutes: Routes = [
  {path: '', children: [
    {path: 'got', component: ScenarioComponent },
    {path: 'dynlyte', component: ScenarioComponent },
    {path: 'dynlyte-npcs', component: ScenarioComponent },
    {path: 'wns7', component: NewsComponent },
    {path: 'prometheus', component: ScenarioComponent },
    {path: 'dossier', component: ScenarioComponent },
    {path: 'newsadmin', component: NewsadminComponent },
    {path: '**', redirectTo: '/', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(gigRoutes)],
  exports: [RouterModule]
})
export class GigSectionRoutingModule { }
