import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedHousingDisplayComponent } from './cp-red-housing-display.component';

describe('CpRedHousingDisplayComponent', () => {
  let component: CpRedHousingDisplayComponent;
  let fixture: ComponentFixture<CpRedHousingDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedHousingDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedHousingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
