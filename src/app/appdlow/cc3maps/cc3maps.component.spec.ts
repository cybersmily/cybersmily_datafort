import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cc3mapsComponent } from './cc3maps.component';

describe('Cc3mapsComponent', () => {
  let component: Cc3mapsComponent;
  let fixture: ComponentFixture<Cc3mapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cc3mapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cc3mapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
