import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CpRedStatsComponent } from './cp-red-stats.component';

describe('CpRedStatsComponent', () => {
  let component: CpRedStatsComponent;
  let fixture: ComponentFixture<CpRedStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CpRedStatsComponent],
      imports: [CommonUiModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
