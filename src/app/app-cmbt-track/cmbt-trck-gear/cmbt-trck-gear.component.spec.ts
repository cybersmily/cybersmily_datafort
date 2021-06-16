import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmbtTrckGearComponent } from './cmbt-trck-gear.component';

describe('CmbtTrckGearComponent', () => {
  let component: CmbtTrckGearComponent;
  let fixture: ComponentFixture<CmbtTrckGearComponent>;

  beforeEach(waitForAsync(() => {
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
