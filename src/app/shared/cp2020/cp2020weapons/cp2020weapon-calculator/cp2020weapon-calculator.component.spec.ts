import { MartialArtsDataService } from './../../cp2020-skills/services/martial-arts-data.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020weaponCalculatorComponent } from './cp2020weapon-calculator.component';

describe('Cp2020weaponCalculatorComponent', () => {
  let component: Cp2020weaponCalculatorComponent;
  let fixture: ComponentFixture<Cp2020weaponCalculatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020weaponCalculatorComponent ],
      imports: [HttpClientTestingModule, CommonUiModule],
      providers: [
        DataService,
        DiceService,
        MartialArtsDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
