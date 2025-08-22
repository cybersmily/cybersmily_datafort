import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JpgmapsComponent } from './jpgmaps.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('JpgmapsComponent', () => {
  let component: JpgmapsComponent;
  let fixture: ComponentFixture<JpgmapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [JpgmapsComponent],
    imports: [CommonUiModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JpgmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
