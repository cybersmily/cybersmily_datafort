import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020ArmorListComponent } from './cp2020-armor-list.component';

describe('Cp2020ArmorListComponent', () => {
  let component: Cp2020ArmorListComponent;
  let fixture: ComponentFixture<Cp2020ArmorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020ArmorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020ArmorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
