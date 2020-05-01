import { DiceService } from './../../shared/services/dice/dice.service';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckModWpnComponent } from './cmbt-trck-mod-wpn.component';

describe('CmbtTrckModWpnComponent', () => {
  let component: CmbtTrckModWpnComponent;
  let fixture: ComponentFixture<CmbtTrckModWpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckModWpnComponent ],
      imports: [ CommonUiModule],
      providers: [ DiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckModWpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
