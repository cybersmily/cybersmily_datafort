import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020SourceGearListComponent } from './cp2020-source-gear-list.component';

describe('Cp2020SourceGearListComponent', () => {
  let component: Cp2020SourceGearListComponent;
  let fixture: ComponentFixture<Cp2020SourceGearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020SourceGearListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020SourceGearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
