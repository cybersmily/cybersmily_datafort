import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './apphome/home/home.component';

export const mainRoutes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'data', loadChildren: () => import('./appdata/datasection.module').then(m => m.DataSectionModule)},
  { path: 'mods', loadChildren: () => import('./appmod/modsection.module').then(m => m.ModSectionModule)},
  { path: 'shop', loadChildren: () => import('./appshop/shopsection.module').then(m => m.ShopSectionModule)},
  { path: 'peeps', loadChildren: () => import('./apppeeps/peepsection.module').then(m => m.PeepSectionModule)},
  { path: 'gigs', loadChildren: () => import('./appgigs/gigsection.module').then(m => m.GigSectionModule)},
  { path: 'apps/fashcalc', loadChildren: () => import('./app-fashion-generator/app-fashion-generator.module')
  .then(m => m.AppFashionGeneratorModule) },
  { path: 'apps/lifepath', loadChildren: () => import('./app-lifepath/app-lifepath.module').then(m => m.AppLifepathModule) },
  { path: 'apps/lpredjmp', loadChildren: () => import('./app-lifepath-red-jumpkit/app-lifepath-red-jumpkit.module')
  .then(m => m.AppLifepathRedJumpkitModule) },
  { path: 'apps/maxmetal', loadChildren: () => import('./app-maxmetal/app-maxmetal.module').then(m => m.AppMaxmetalModule) },
  { path: 'apps/nrtrace', loadChildren: () => import('./app-netrun/app-netrun.module').then(m => m.AppNetrunModule) },
  { path: 'apps/qkpregen',
    loadChildren: () => import('./app-cp-red-template-character/app-cp-red-template-character.module')
    .then(m => m.AppCpRedTemplateCharacterModule) },
  { path: 'apps/chargen',
    loadChildren: () => import('./app-character-generator/app-character-generator.module').then(m => m.AppCharacterGeneratorModule) },
  { path: 'apps/cmbttrk',
    loadChildren: () => import('./app-cmbt-track/app-cmbt-track.module')
    .then(m => m.AppCmbtTrackModule) },
  { path: 'apps/cmbtzone',
      loadChildren: () => import('./app-cmbt-zone-generator/app-cmbt-zone-generator.module')
      .then(m => m.AppCmbtZoneGeneratorModule) },
  { path: 'apps/fixcalc',
    loadChildren: () => import('./app-fixer-calc/app-fixer-calc.module')
    .then(m => m.AppFixerCalcModule) },
  { path: 'apps/druglab',
      loadChildren: () => import('./app-drug-lab/app-drug-lab.module')
      .then(m => m.AppDrugLabModule) },
  { path: 'apps/deckmgr',
      loadChildren: () => import('./app-deck-manager/app-deck-manager.module')
      .then(m => m.AppDeckManagerModule) },
  { path: 'apps/rednet',
      loadChildren: () => import('./app-cp-red-net-arch/app-cp-red-net-arch.module')
      .then(m => m.AppCpRedNetArchModule) },
  { path: 'apps/headlines',
    loadChildren: () => import('./app-news-headlines/app-news-headlines.module')
    .then(m => m.AppNewsHeadlinesModule) },
  { path: 'apps/nightmarket',
      loadChildren: () => import('./app-night-market/app-night-market.module')
      .then(m => m.AppNightMarketModule) },
  { path: 'dlow', loadChildren: () => import('./appdlow/dlowsection.module').then(m => m.DlowSectionModule) },
  { path: 'beta', loadChildren: () => import('./app-beta-view/app-beta-view.module').then(m => m.AppBetaViewModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
