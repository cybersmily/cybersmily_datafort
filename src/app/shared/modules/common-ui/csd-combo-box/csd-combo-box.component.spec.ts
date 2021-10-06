import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsdComboBoxComponent } from './csd-combo-box.component';

describe('CsdComboBoxComponent', () => {
  let component: CsdComboBoxComponent;
  let fixture: ComponentFixture<CsdComboBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsdComboBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsdComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
