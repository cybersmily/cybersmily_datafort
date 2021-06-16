import { CommonUiModule } from './shared/modules/common-ui/common-ui.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { HomeComponent } from './apphome/home/home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let router;
  let app;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
        CommonUiModule,
        SharedModule,
        AppRoutingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    router = TestBed.get(Router);
    app = new AppComponent(router);
  });


  it('should create the app', waitForAsync(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Cybersmily'`, waitForAsync(() => {
    app = new AppComponent(router);
    expect(app.title).toContain('Cybersmily');
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
