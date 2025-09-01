import { CommonUiModule } from './../../common-ui/common-ui.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NpcProfileModalComponent } from './npcprofilemodal.component';
import { DataService } from './../../../services/file-services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NpcProfileComponent', () => {
  let component: NpcProfileModalComponent;
  let fixture: ComponentFixture<NpcProfileModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [
        NpcProfileModalComponent
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
    fixture = TestBed.createComponent(NpcProfileModalComponent);
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
