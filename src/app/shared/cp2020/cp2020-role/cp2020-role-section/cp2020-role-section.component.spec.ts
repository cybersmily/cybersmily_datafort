import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { Cp2020RolesDataService } from './../services/cp2020-roles-data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RoleSectionComponent } from './cp2020-role-section.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020RoleSectionComponent', () => {
  let component: Cp2020RoleSectionComponent;
  let fixture: ComponentFixture<Cp2020RoleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020RoleSectionComponent],
    imports: [CommonUiModule],
    providers: [
        DataService,
        DiceService,
        Cp2020RolesDataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020RoleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
