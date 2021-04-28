import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterImprovementComponent } from './cp-red-character-improvement.component';

describe('CpRedCharacterImprovementComponent', () => {
  let component: CpRedCharacterImprovementComponent;
  let fixture: ComponentFixture<CpRedCharacterImprovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterImprovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
