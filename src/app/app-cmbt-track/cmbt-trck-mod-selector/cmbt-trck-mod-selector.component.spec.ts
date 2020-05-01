import { DataService } from './../../shared/services/data.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { CmbtTrckModWpnComponent } from './../cmbt-trck-mod-wpn/cmbt-trck-mod-wpn.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckModSelectorComponent } from './cmbt-trck-mod-selector.component';

describe('CmbtTrckModSelectorComponent', () => {
  let component: CmbtTrckModSelectorComponent;
  let fixture: ComponentFixture<CmbtTrckModSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CmbtTrckModSelectorComponent,
        CmbtTrckModWpnComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientModule
      ],
      providers: [
        DiceService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckModSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
