import { ShopSectionModule } from './appshop/shopsection.module';
import { PeepSectionModule } from './apppeeps/peepsection.module';
import { ModSectionModule } from './appmod/modsection.module';
import { GigSectionModule } from './appgigs/gigsection.module';
import { DataSectionModule } from './appdata/datasection.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppLifepathRedJumpkitModule } from './app-lifepath-red-jumpkit/app-lifepath-red-jumpkit.module';
import { AppLifepathModule } from './app-lifepath/app-lifepath.module';
import { AppCharacterGeneratorModule } from './app-character-generator/app-character-generator.module';
import { AppCpRedTemplateCharacterModule } from './app-cp-red-template-character/app-cp-red-template-character.module';
import { AppMaxmetalModule } from './app-maxmetal/app-maxmetal.module';
import { AppNetrunModule } from './app-netrun/app-netrun.module';
import { AppFixerCalcModule } from './app-fixer-calc/app-fixer-calc.module';
import { AppDeckManagerModule } from './app-deck-manager/app-deck-manager.module';
import { AppDrugLabModule } from './app-drug-lab/app-drug-lab.module';
import { AppFashionGeneratorModule } from './app-fashion-generator/app-fashion-generator.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './shared/modules/common-ui/common-ui.module';
import { AppCmbtTrackModule } from './app-cmbt-track/app-cmbt-track.module';
import { DlowSectionModule } from './appdlow/dlowsection.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './shared/services/file-services/data.service';
import { HomeComponent } from './apphome/home/home.component';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule, mainRoutes } from './app-routing.module';
import { TestBed, fakeAsync, tick, ComponentFixture, flush, flushMicrotasks } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NgModuleFactoryLoader, Component, NgModule } from '@angular/core';


describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
        AppRoutingModule,
        AppCharacterGeneratorModule,
        AppCmbtTrackModule,
        AppCpRedTemplateCharacterModule,
        AppDrugLabModule,
        AppDeckManagerModule,
        AppFashionGeneratorModule,
        AppFixerCalcModule,
        AppLifepathModule,
        AppLifepathRedJumpkitModule,
        AppMaxmetalModule,
        AppNetrunModule,
        BrowserAnimationsModule,
        CommonUiModule,
        DataSectionModule,
        DlowSectionModule,
        GigSectionModule,
        ModSectionModule,
        PeepSectionModule,
        ShopSectionModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(mainRoutes)
      ],
      providers: [
        DataService
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
  });


  it('should be created', () => {
    expect(mainRoutes).toBeTruthy();
  });

  it('navigate to "" redirects you to /', fakeAsync(() => {
    router.navigate(['']).then( () => {
      fixture.detectChanges();
      expect(location.path()).toBe('/');
      fixture.destroy();
      flush();
    });
  }));

  it('navigate to "notapath" redirects you to /', fakeAsync(() => {
    router.navigate(['/notapath']).then( () => {
      fixture.detectChanges();
      expect(location.path()).toBe('/');
      fixture.destroy();
      flush();
    });
  }));

  it('navigate to "data/roles" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/data/roles']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/data/roles');
  }));

  it('navigate to "shop/cyber" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/shop/cyber']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/shop/cyber');
  }));

  it('navigate to "mods/luck" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/mods/luck']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/mods/luck');
  }));

  it('navigate to "peeps/copscorps" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/peeps/copscorps']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/peeps/copscorps');
  }));

  it('navigate to "gigs/got" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/gigs/got']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/gigs/got');
  }));

  it('navigate to "apps/fashcalc" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/fashcalc']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/fashcalc');
  }));

  it('navigate to "apps/lifepath" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/lifepath']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/lifepath');
  }));

  it('navigate to "apps/lpredjmp" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/lpredjmp']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/lpredjmp');
  }));

  it('navigate to "apps/maxmetal" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/maxmetal']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/maxmetal');
  }));

  it('navigate to "apps/nrtrace" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/nrtrace']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/nrtrace');
  }));

  it('navigate to "apps/qkpregen" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/qkpregen']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/qkpregen');
  }));

  it('navigate to "apps/chargen" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/chargen']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/chargen');
  }));

  it('navigate to "apps/cmbttrk" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/cmbttrk']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/cmbttrk');
  }));

  it('navigate to "apps/fixcalc" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/fixcalc']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/fixcalc');
  }));

  it('navigate to "apps/deckmgr" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/deckmgr']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/deckmgr');
  }));

  it('navigate to "apps/druglab" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/druglab']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/druglab');
  }));

  it('navigate to "apps/chargen" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/apps/chargen']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/apps/chargen');
  }));

  it('navigate to "dlow" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/dlow/maps']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/dlow/maps');
  }));

  it('navigate to "dlow" redirects you to /', fakeAsync(() => {
    let path = '/test';
    router.navigate(['/dlow/cc3']).then( (result) => {
      path = location.path();
    });
    flushMicrotasks();
    expect(path).toBe('/dlow/cc3');
  }));
});
