import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cp2020CyberwareGeneratorService } from './../services/cp2020-cyberware-generator.service';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services/data.service';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020CyberwareTableComponent } from './cp2020-cyberware-table.component';

describe('Cp2020CyberwareTableComponent', () => {
  let component: Cp2020CyberwareTableComponent;
  let fixture: ComponentFixture<Cp2020CyberwareTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cp2020CyberwareTableComponent ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DiceService,
        Cp2020CyberwareGeneratorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberwareTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
