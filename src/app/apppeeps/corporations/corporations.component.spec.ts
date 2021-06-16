import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CorporationCardComponent } from './../corporation-card/corporation-card.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorporationsComponent } from './corporations.component';

describe('CorporationsComponent', () => {
  let component: CorporationsComponent;
  let fixture: ComponentFixture<CorporationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CorporationsComponent,
        CorporationCardComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
