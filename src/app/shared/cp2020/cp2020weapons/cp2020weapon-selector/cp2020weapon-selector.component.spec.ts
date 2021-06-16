import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { PipesModule } from './../../../pipes/pipes.module';
import { DataService } from './../../../services/file-services/data.service';
import { WeaponDataService } from './../services/weapon-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020weaponSelectorComponent } from './cp2020weapon-selector.component';

describe('Cp2020weaponSelectorComponent', () => {
  let component: Cp2020weaponSelectorComponent;
  let fixture: ComponentFixture<Cp2020weaponSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Cp2020weaponSelectorComponent],
      imports: [HttpClientTestingModule, PipesModule, CommonUiModule],
      providers: [WeaponDataService, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020weaponSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
