import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NrdebugComponent } from './nrdebug.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrdebugComponent', () => {
  let component: NrdebugComponent;
  let fixture: ComponentFixture<NrdebugComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        NrdebugComponent
    ],
    imports: [CommonUiModule],
    providers: [
        DataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrdebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
