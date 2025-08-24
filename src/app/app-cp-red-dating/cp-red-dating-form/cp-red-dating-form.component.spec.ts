import { CpRedDateGeneratorService } from './../services/cp-red-date-generator/cp-red-date-generator.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRedDatingFormComponent } from './cp-red-dating-form.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CpRedDatingFormComponent', () => {
  let component: CpRedDatingFormComponent;
  let fixture: ComponentFixture<CpRedDatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CpRedDatingFormComponent],
    imports: [CommonUiModule,
        BrowserAnimationsModule],
    providers: [
        DataService,
        DiceService,
        CpRedDateGeneratorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRedDatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
