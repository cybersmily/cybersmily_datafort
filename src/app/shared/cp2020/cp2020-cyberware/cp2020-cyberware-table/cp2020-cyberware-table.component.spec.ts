import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CyberDataService } from './../services/cyber-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Cp2020CyberwareGeneratorService } from './../services/cp2020-cyberware-generator.service';
import { DiceService } from './../../../services/dice/dice.service';
import { DataService } from './../../../services/file-services';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020CyberwareTableComponent } from './cp2020-cyberware-table.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020CyberwareTableComponent', () => {
  let component: Cp2020CyberwareTableComponent;
  let fixture: ComponentFixture<Cp2020CyberwareTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [Cp2020CyberwareTableComponent],
    imports: [CommonUiModule,
        BrowserAnimationsModule],
    providers: [
        DataService,
        DiceService,
        CyberDataService,
        Cp2020CyberwareGeneratorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
