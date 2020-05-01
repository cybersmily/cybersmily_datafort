import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmbtTrckGearComponent } from './cmbt-trck-gear.component';

describe('CmbtTrckGearComponent', () => {
  let component: CmbtTrckGearComponent;
  let fixture: ComponentFixture<CmbtTrckGearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbtTrckGearComponent ],
      imports: [
        CommonUiModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbtTrckGearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
