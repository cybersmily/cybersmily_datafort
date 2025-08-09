import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmoptionsformComponent } from './mmoptionsform.component';

describe('MmoptionsformComponent', () => {
  let component: MmoptionsformComponent;
  let fixture: ComponentFixture<MmoptionsformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [MmoptionsformComponent],
    imports: [CommonUiModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmoptionsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
