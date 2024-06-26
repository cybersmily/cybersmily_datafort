import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cp2020ACPAModule } from './../../cp2020-acpa.module';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaSelectEquipmentComponent } from './cp2020-acpa-select-equipment.component';

describe('Cp2020AcpaSelectEquipementComponent', () => {
  let component: Cp2020AcpaSelectEquipmentComponent;
  let fixture: ComponentFixture<Cp2020AcpaSelectEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cp2020AcpaSelectEquipmentComponent],
      imports: [CommonUiModule, Cp2020ACPAModule, HttpClientTestingModule],
      providers: [DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020AcpaSelectEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
