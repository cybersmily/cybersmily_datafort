import { CyberDataService } from './../services/cyber-data.service';
import { DataService } from './../../../services/file-services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { DiceService } from './../../../services/dice/dice.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020CyberwareEditorComponent } from './cp2020-cyberware-editor.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020CyberwareEditorComponent', () => {
  let component: Cp2020CyberwareEditorComponent;
  let fixture: ComponentFixture<Cp2020CyberwareEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [Cp2020CyberwareEditorComponent],
    imports: [CommonUiModule],
    providers: [
        DiceService,
        DataService,
        CyberDataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020CyberwareEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
