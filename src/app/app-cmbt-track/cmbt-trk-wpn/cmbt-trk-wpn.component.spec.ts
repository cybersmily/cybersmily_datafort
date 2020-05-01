import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../../shared/services/dice/dice.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrkWpnComponent } from './cmbt-trk-wpn.component';

describe('CmbtTrkWpnComponent', () => {
  let component: CmbtTrkWpnComponent;
  let fixture: ComponentFixture<CmbtTrkWpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonUiModule,
        PipesModule
      ],
      declarations: [
        CmbtTrkWpnComponent
      ],
      providers: [
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrkWpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
