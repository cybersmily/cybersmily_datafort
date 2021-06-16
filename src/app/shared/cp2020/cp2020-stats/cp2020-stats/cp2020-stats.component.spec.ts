import { DiceService } from './../../../services/dice/dice.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020StatsComponent } from './cp2020-stats.component';

describe('Cp2020StatsComponent', () => {
  let component: Cp2020StatsComponent;
  let fixture: ComponentFixture<Cp2020StatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020StatsComponent ],
      imports: [
        CommonUiModule
      ],
      providers: [
        DiceService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
