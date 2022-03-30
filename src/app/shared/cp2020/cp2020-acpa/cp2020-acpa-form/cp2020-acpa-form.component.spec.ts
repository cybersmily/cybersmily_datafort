import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/dataservice/data.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { Cp2020ACPADataAttributesService } from './../services/cp2020-acpa-data-attrbutes/cp2020-acpa-data-attributes.service';
import { Cp2020ACPABuilderService } from './../services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaFormComponent } from './cp2020-acpa-form.component';

describe('Cp2020AcpaFormComponent', () => {
  let component: Cp2020AcpaFormComponent;
  let fixture: ComponentFixture<Cp2020AcpaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cp2020AcpaFormComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        Cp2020ACPABuilderService,
        Cp2020ACPADataAttributesService,
        DataService,
        DiceService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
