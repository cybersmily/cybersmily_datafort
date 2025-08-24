import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './apphome/home/home.component';

export const mainRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'gs',
    loadChildren: () =>
      import('./game-statistics/game-statistics.module').then(
        (m) => m.GameStatisticsModule
      ),
  },
  {
    path: 'data',
    loadChildren: () =>
      import('./appdata/datasection.module').then((m) => m.DataSectionModule),
  },
  {
    path: 'mods',
    loadChildren: () =>
      import('./appmod/modsection.module').then((m) => m.ModSectionModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./appshop/shopsection.module').then((m) => m.ShopSectionModule),
  },
  {
    path: 'peeps',
    loadChildren: () =>
      import('./apppeeps/peepsection.module').then((m) => m.PeepSectionModule),
  },
  {
    path: 'gigs',
    loadChildren: () =>
      import('./appgigs/gigsection.module').then((m) => m.GigSectionModule),
  },
  {
    path: 'apps/clubgen',
    loadChildren: () =>
      import('./app-club-generator/app-club-generator.module').then(
        (m) => m.AppClubGeneratorModule
      ),
  },
  {
    path: 'apps/crcz',
    loadChildren: () =>
      import('./app-cp-combat-zone/app-cp-combat-zone.module').then(
        (m) => m.AppCpCombatZoneModule
      ),
  },
  {
    path: 'apps/fashcalc',
    loadChildren: () =>
      import('./app-fashion-generator/app-fashion-generator.module').then(
        (m) => m.AppFashionGeneratorModule
      ),
  },
  {
    path: 'apps/lifepath',
    loadChildren: () =>
      import('./app-lifepath/app-lifepath.module').then(
        (m) => m.AppLifepathModule
      ),
  },
  {
    path: 'apps/lpredjmp',
    loadChildren: () =>
      import('./app-cp-red-lifepath/app-cp-red-lifepath.module').then(
        (m) => m.AppCpRedLifepathModule
      ),
  },
  {
    path: 'apps/cp2077',
    loadChildren: () =>
      import('./app-cp2077-drop-tracker/app-cp2077-drop-tracker.module').then(
        (m) => m.AppCp2077DropTrackerModule
      ),
  },
  {
    path: 'apps/redchargen',
    loadChildren: () =>
      import(
        './app-cp-red-character-generator/app-cp-red-character-generator.module'
      ).then((m) => m.AppCpRedCharacterGeneratorModule),
  },

  {
    path: 'apps/redlifepath',
    loadChildren: () =>
      import('./app-cp-red-lifepath/app-cp-red-lifepath.module').then(
        (m) => m.AppCpRedLifepathModule
      ),
  },
  {
    path: 'apps/acpa',
    loadChildren: () =>
      import('./app-acpa-generator/app-acpa-generator.module').then(
        (m) => m.AppAcpaGeneratorModule
      ),
  },
  {
    path: 'apps/chargen',
    loadChildren: () =>
      import('./app-character-generator/app-character-generator.module').then(
        (m) => m.AppCharacterGeneratorModule
      ),
  },
  {
    path: 'apps/cmbttrk',
    loadChildren: () =>
      import('./app-cmbt-track/app-cmbt-track.module').then(
        (m) => m.AppCmbtTrackModule
      ),
  },
  {
    path: 'apps/cmbtzone',
    loadChildren: () =>
      import('./app-cmbt-zone-generator/app-cmbt-zone-generator.module').then(
        (m) => m.AppCmbtZoneGeneratorModule
      ),
  },
  {
    path: 'apps/dfdesigner',
    loadChildren: () =>
      import('./app-datafort-designer/app-datafort-designer.module').then(
        (m) => m.AppDatafortDesignerModule
      ),
  },
  {
    path: 'apps/fixcalc',
    loadChildren: () =>
      import('./app-fixer-calc/app-fixer-calc.module').then(
        (m) => m.AppFixerCalcModule
      ),
  },
  {
    path: 'apps/druglab',
    loadChildren: () =>
      import('./app-drug-lab/app-drug-lab.module').then(
        (m) => m.AppDrugLabModule
      ),
  },
  {
    path: 'apps/deckmgr',
    loadChildren: () =>
      import('./app-deck-manager/app-deck-manager.module').then(
        (m) => m.AppDeckManagerModule
      ),
  },
  {
    path: 'apps/ganggen',
    loadChildren: () =>
      import('./app-gang-generator/app-gang-generator.module').then(
        (m) => m.AppGangGeneratorModule
      ),
  },
  {
    path: 'apps/maxmetal',
    loadChildren: () =>
      import('./app-maxmetal/app-maxmetal.module').then(
        (m) => m.AppMaxmetalModule
      ),
  },
  {
    path: 'apps/nrtrace',
    loadChildren: () =>
      import('./app-netrun/app-netrun.module').then((m) => m.AppNetrunModule),
  },

  {
    path: 'apps/qkpregen',
    loadChildren: () =>
      import(
        './app-cp-red-template-character/app-cp-red-template-character.module'
      ).then((m) => m.AppCpRedTemplateCharacterModule),
  },
  {
    path: 'apps/rednet',
    loadChildren: () =>
      import('./app-cp-red-net-arch/app-cp-red-net-arch.module').then(
        (m) => m.AppCpRedNetArchModule
      ),
  },
  {
    path: 'apps/reddating',
    loadChildren: () =>
      import('./app-cp-red-dating/app-cp-red-dating.module').then(
        (m) => m.AppCpRedDatingModule
      ),
  },
  {
    path: 'apps/headlines',
    loadChildren: () =>
      import('./app-news-headlines/app-news-headlines.module').then(
        (m) => m.AppNewsHeadlinesModule
      ),
  },
  {
    path: 'apps/weather',
    loadChildren: () =>
      import('./app-cp-red-weather/app-cp-red-weather.module').then(
        (m) => m.AppCpRedWeatherModule
      ),
  },
  {
    path: 'apps/nightmarket',
    loadChildren: () =>
      import('./app-night-market/app-night-market.module').then(
        (m) => m.AppNightMarketModule
      ),
  },

  {
    path: 'dlow',
    loadChildren: () =>
      import('./appdlow/dlowsection.module').then((m) => m.DlowSectionModule),
  },
  {
    path: 'beta',
    loadChildren: () =>
      import('./app-beta-view/app-beta-view.module').then(
        (m) => m.AppBetaViewModule
      ),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
