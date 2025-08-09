import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Cp2020ACPAModule } from './../../cp2020-acpa.module';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaEquipmentEditorComponent } from './cp2020-acpa-equipment-editor.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020AcpaEquipmentEditorComponent', () => {
  let component: Cp2020AcpaEquipmentEditorComponent;
  let fixture: ComponentFixture<Cp2020AcpaEquipmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020AcpaEquipmentEditorComponent],
    imports: [CommonUiModule, Cp2020ACPAModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(Cp2020AcpaEquipmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
