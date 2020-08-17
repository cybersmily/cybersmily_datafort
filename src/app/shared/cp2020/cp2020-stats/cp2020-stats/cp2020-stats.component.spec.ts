import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020StatsComponent } from './cp2020-stats.component';

describe('Cp2020StatsComponent', () => {
  let component: Cp2020StatsComponent;
  let fixture: ComponentFixture<Cp2020StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020StatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
