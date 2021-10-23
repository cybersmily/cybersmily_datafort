import { HttpClientModule } from '@angular/common/http';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services';
import { DiceService } from './../../shared/services/dice/dice.service';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtTrkSkillsComponent } from './cmbt-trk-skills.component';

describe('CmbtTrkSkillsComponent', () => {
  let component: CmbtTrkSkillsComponent;
  let fixture: ComponentFixture<CmbtTrkSkillsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonUiModule,
        PipesModule,
        HttpClientModule
      ],
      declarations: [
        CmbtTrkSkillsComponent
      ],
      providers: [
        DiceService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrkSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
