import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020DatafortMapComponent } from './cp2020-datafort-map.component';

describe('Cp2020DatafortMapComponent', () => {
  let component: Cp2020DatafortMapComponent;
  let fixture: ComponentFixture<Cp2020DatafortMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020DatafortMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020DatafortMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
