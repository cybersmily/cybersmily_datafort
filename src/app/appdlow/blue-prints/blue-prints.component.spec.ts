import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/file-services';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BluePrintsComponent } from './blue-prints.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BluePrintsComponent', () => {
  let component: BluePrintsComponent;
  let fixture: ComponentFixture<BluePrintsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [BluePrintsComponent],
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
    fixture = TestBed.createComponent(BluePrintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
