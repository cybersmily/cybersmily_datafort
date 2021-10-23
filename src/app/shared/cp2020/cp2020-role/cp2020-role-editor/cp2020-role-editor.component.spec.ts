import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { Cp2020RolesDataService } from './../services/cp2020-roles-data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020RoleEditorComponent } from './cp2020-role-editor.component';

describe('Cp2020RoleEditorComponent', () => {
  let component: Cp2020RoleEditorComponent;
  let fixture: ComponentFixture<Cp2020RoleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020RoleEditorComponent ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule
      ],
      providers: [
        Cp2020RolesDataService,
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020RoleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
