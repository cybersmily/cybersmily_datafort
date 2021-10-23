import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { Cp2020RolesDataService } from './../services/cp2020-roles-data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RoleSectionComponent } from './cp2020-role-section.component';

describe('Cp2020RoleSectionComponent', () => {
  let component: Cp2020RoleSectionComponent;
  let fixture: ComponentFixture<Cp2020RoleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020RoleSectionComponent ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule
      ],
      providers: [
        DataService,
        DiceService,
        Cp2020RolesDataService
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
