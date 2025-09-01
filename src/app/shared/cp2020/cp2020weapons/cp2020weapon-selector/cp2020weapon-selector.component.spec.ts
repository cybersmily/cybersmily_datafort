import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { PipesModule } from './../../../pipes/pipes.module';
import { DataService } from './../../../services/file-services';
import { WeaponDataService } from './../services/weapon-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020weaponSelectorComponent } from './cp2020weapon-selector.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020weaponSelectorComponent', () => {
  let component: Cp2020weaponSelectorComponent;
  let fixture: ComponentFixture<Cp2020weaponSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [Cp2020weaponSelectorComponent],
    imports: [PipesModule, CommonUiModule],
    providers: [WeaponDataService, DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
