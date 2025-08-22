import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Cp2020ACPAModule } from './../../cp2020-acpa.module';
import { CommonUiModule } from './../../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020AcpaCarriedEditorComponent } from './cp2020-acpa-carried-editor.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020AcpaCarriedEditorComponent', () => {
  let component: Cp2020AcpaCarriedEditorComponent;
  let fixture: ComponentFixture<Cp2020AcpaCarriedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020AcpaCarriedEditorComponent],
    imports: [CommonUiModule, Cp2020ACPAModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(Cp2020AcpaCarriedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
