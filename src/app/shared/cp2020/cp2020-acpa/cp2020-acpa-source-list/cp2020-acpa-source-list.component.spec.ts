import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaSourceListComponent } from './cp2020-acpa-source-list.component';

describe('Cp2020AcpaSourceListComponent', () => {
  let component: Cp2020AcpaSourceListComponent;
  let fixture: ComponentFixture<Cp2020AcpaSourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaSourceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaSourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
