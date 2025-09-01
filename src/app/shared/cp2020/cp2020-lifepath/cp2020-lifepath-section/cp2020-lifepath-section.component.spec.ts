import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './../../../services/file-services';
import { DiceService } from './../../../services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../../modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cp2020LifepathSectionComponent } from './cp2020-lifepath-section.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Cp2020LifepathSectionComponent', () => {
  let component: Cp2020LifepathSectionComponent;
  let fixture: ComponentFixture<Cp2020LifepathSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [Cp2020LifepathSectionComponent],
    imports: [BrowserAnimationsModule,
        CommonUiModule],
    providers: [
        DiceService,
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cp2020LifepathSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
