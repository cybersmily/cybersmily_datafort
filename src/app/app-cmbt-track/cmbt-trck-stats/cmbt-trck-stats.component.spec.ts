import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckStatComponent } from './../cmbt-trck-stat/cmbt-trck-stat.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckStatsComponent } from './cmbt-trck-stats.component';

describe('CmbtTrckStatsComponent', () => {
  let component: CmbtTrckStatsComponent;
  let fixture: ComponentFixture<CmbtTrckStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CmbtTrckStatsComponent,
        CmbtTrckStatComponent
      ],
      imports: [
        CommonUiModule
      ],
      providers: [ DiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
