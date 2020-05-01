import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixerCalcHotStuffAreaComponent } from './fixer-calc-hot-stuff-area.component';

describe('FixerCalcHotStuffAreaComponent', () => {
  let component: FixerCalcHotStuffAreaComponent;
  let fixture: ComponentFixture<FixerCalcHotStuffAreaComponent>;

  beforeEach(async(() => {
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
