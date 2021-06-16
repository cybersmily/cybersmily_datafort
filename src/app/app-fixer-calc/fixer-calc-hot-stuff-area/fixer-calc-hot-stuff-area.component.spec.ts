import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixerCalcHotStuffAreaComponent } from './fixer-calc-hot-stuff-area.component';

describe('FixerCalcHotStuffAreaComponent', () => {
  let component: FixerCalcHotStuffAreaComponent;
  let fixture: ComponentFixture<FixerCalcHotStuffAreaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FixerCalcHotStuffAreaComponent ],
      imports: [
        CommonUiModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixerCalcHotStuffAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
