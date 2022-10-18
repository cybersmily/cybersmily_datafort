import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020HaggleComponent } from './cp2020-haggle.component';

describe('Cp2020HaggleComponent', () => {
  let component: Cp2020HaggleComponent;
  let fixture: ComponentFixture<Cp2020HaggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020HaggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cp2020HaggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
