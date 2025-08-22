import { CyberDataService } from './../services/cyber-data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { PipesModule } from './../../../pipes/pipes.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { DataService } from './../../../services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cp2020CyberwareSelectorComponent } from './cp2020-cyberware-selector.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020CyberwareSelectorComponent', () => {
  let component: Cp2020CyberwareSelectorComponent;
  let fixture: ComponentFixture<Cp2020CyberwareSelectorComponent>;
  let dataService: DataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        Cp2020CyberwareSelectorComponent
    ],
    imports: [CommonUiModule,
        PipesModule],
    providers: [
        DataService,
        DiceService,
        CyberDataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(Cp2020CyberwareSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
