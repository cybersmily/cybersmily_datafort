import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegasFormComponent } from './bodegas-form.component';

describe('BodegasFormComponent', () => {
  let component: BodegasFormComponent;
  let fixture: ComponentFixture<BodegasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
