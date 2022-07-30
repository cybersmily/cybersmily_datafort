import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedArmorRowComponent } from './cp-red-armor-row.component';

describe('CpRedArmorRowComponent', () => {
  let component: CpRedArmorRowComponent;
  let fixture: ComponentFixture<CpRedArmorRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedArmorRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedArmorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
