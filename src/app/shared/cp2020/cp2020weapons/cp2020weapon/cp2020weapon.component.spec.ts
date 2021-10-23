import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { DataService } from './../../../services/file-services';
import { Cp2020weaponEditorComponent } from './../cp2020weapon-editor/cp2020weapon-editor.component';
import { WeaponDataService } from './../services/weapon-data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020weaponComponent } from './cp2020weapon.component';

describe('Cp2020weaponComponent', () => {
  let component: Cp2020weaponComponent;
  let fixture: ComponentFixture<Cp2020weaponComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Cp2020weaponComponent, Cp2020weaponEditorComponent],
      imports: [HttpClientTestingModule, CommonUiModule],
      providers: [DiceService, WeaponDataService, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
