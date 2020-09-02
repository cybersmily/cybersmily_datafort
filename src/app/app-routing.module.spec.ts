import { AppRoutingModule, mainRoutes } from './app-routing.module';
import { TestBed } from '@angular/core/testing';

describe('AppRoutingModule', () => {
  let routing: AppRoutingModule;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule
      ]
    });
    routing = TestBed.inject(AppRoutingModule);
  });

  it('should be created', () => {
    expect(routing).toBeTruthy();
    expect(mainRoutes).toBeTruthy();
  });
});
