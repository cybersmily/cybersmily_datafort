import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020magazinesComponent } from './cp2020magazines.component';

describe('Cp2020magazinesComponent', () => {
  let component: Cp2020magazinesComponent;
  let fixture: ComponentFixture<Cp2020magazinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020magazinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020magazinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
