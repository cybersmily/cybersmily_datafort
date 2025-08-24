import { Cp2020LifepathModule } from './../../shared/cp2020/cp2020-lifepath/cp2020-lifepath.module';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { SeoService } from './../../shared/services/seo/seo.service';
import { DiceService } from './../../shared/services/dice/dice.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifepathGeneratorComponent } from './lifepath-generator.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LifepathGeneratorComponent', () => {
  let component: LifepathGeneratorComponent;
  let fixture: ComponentFixture<LifepathGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        LifepathGeneratorComponent
    ],
    imports: [CommonUiModule,
        Cp2020LifepathModule],
    providers: [
        DataService,
        DiceService,
        SeoService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifepathGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
