import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NrnavigatorComponent } from './nrnavigator.component';
import { DataService } from './../../shared/services/file-services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrnavigatorComponent', () => {
  let component: NrnavigatorComponent;
  let fixture: ComponentFixture<NrnavigatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        NrnavigatorComponent
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
    fixture = TestBed.createComponent(NrnavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
