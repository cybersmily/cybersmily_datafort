import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCyberwareDisplayComponent } from './cp-red-cyberware-display.component';

describe('CpRedCyberwareDisplayComponent', () => {
  let component: CpRedCyberwareDisplayComponent;
  let fixture: ComponentFixture<CpRedCyberwareDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpRedCyberwareDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCyberwareDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
