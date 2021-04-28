import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedCharacterStatsComponent } from './cp-red-character-stats.component';

describe('CpRedCharacterStatsComponent', () => {
  let component: CpRedCharacterStatsComponent;
  let fixture: ComponentFixture<CpRedCharacterStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRedCharacterStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedCharacterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
