import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CmbtTrkWpnComponent } from './../cmbt-trk-wpn/cmbt-trk-wpn.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrkWpnsComponent } from './cmbt-trk-wpns.component';

describe('CmbtTrkWpnsComponent', () => {
  let component: CmbtTrkWpnsComponent;
  let fixture: ComponentFixture<CmbtTrkWpnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonUiModule,
        PipesModule,
        HttpClientModule
      ],
      declarations: [
        CmbtTrkWpnsComponent,
        CmbtTrkWpnComponent
      ],
      providers: [
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrkWpnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
