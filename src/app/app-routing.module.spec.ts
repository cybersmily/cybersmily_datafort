import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './shared/services/data.service';
import { HomeComponent } from './apphome/home/home.component';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { AppRoutingModule, mainRoutes } from './app-routing.module';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';

describe('AppRoutingModule', () => {
  let routing: AppRoutingModule;
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
        AppRoutingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(mainRoutes)
      ],
      providers: [
        DataService
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    routing = TestBed.inject(AppRoutingModule);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(routing).toBeTruthy();
    expect(mainRoutes).toBeTruthy();
  });

  it('navigate to "" redirects you to /', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));

  it('navigate to "notapath" redirects you to /', fakeAsync(() => {
    router.navigate(['/notapath']).then( () => {
      expect(location.path()).toBe('/');
    });
  }));

});
