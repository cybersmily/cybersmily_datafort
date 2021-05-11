import { Cp2020weaponCalculatorComponent } from './../cp2020weapon-calculator/cp2020weapon-calculator.component';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { WeaponDataService } from './../services/weapon-data.service';
import { DataService } from './../../../services/file-services/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cp2020weaponEditorComponent } from './../cp2020weapon-editor/cp2020weapon-editor.component';
import { Cp2020weaponSelectorComponent } from './../cp2020weapon-selector/cp2020weapon-selector.component';
import { Cp2020weaponComponent } from './../cp2020weapon/cp2020weapon.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020weapontableComponent } from './cp2020weapontable.component';

describe('Cp2020weapontableComponent', () => {
  let component: Cp2020weapontableComponent;
  let fixture: ComponentFixture<Cp2020weapontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Cp2020weapontableComponent,
        Cp2020weaponComponent,
        Cp2020weaponSelectorComponent,
        Cp2020weaponEditorComponent,
        Cp2020weaponCalculatorComponent
      ],
      imports: [HttpClientTestingModule, CommonUiModule],
      providers: [DiceService, WeaponDataService, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weapontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
