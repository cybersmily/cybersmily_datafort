import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SourceArmorListComponent } from './cp2020-source-armor-list.component';

describe('Cp2020SourceArmorListComponent', () => {
  let component: Cp2020SourceArmorListComponent;
  let fixture: ComponentFixture<Cp2020SourceArmorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SourceArmorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020SourceArmorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
