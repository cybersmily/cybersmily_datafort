import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CorporationCardComponent } from './../corporation-card/corporation-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporationsComponent } from './corporations.component';

describe('CorporationsComponent', () => {
  let component: CorporationsComponent;
  let fixture: ComponentFixture<CorporationsComponent>;

  beforeEach(async(() => {
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
