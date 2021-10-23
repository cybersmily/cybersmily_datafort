import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmoptionsformComponent } from './mmoptionsform.component';

describe('MmoptionsformComponent', () => {
  let component: MmoptionsformComponent;
  let fixture: ComponentFixture<MmoptionsformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MmoptionsformComponent ],
      imports: [
        CommonUiModule,
        HttpClientModule
      ],
      providers: [DataService]
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
