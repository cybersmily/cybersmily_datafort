import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JpgmapsComponent } from './jpgmaps.component';

describe('JpgmapsComponent', () => {
  let component: JpgmapsComponent;
  let fixture: ComponentFixture<JpgmapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JpgmapsComponent],
      imports: [CommonUiModule, HttpClientTestingModule],
      providers: [DataService],
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
