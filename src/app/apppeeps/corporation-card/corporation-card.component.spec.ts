import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { CorporationCard } from '../../shared/models/corporation';
import { DataService } from './../../shared/services/file-services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CorporationCardComponent } from './corporation-card.component';

describe('CorporationCardComponent', () => {
  let component: CorporationCardComponent;
  let fixture: ComponentFixture<CorporationCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporationCardComponent ],
      imports: [
        HttpClientTestingModule,
        CommonUiModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporationCardComponent);
    component = fixture.componentInstance;
    const corp: CorporationCard = {
      name: 'test corporation',
      img: 'corp',
      slogan: 'this is a test corporation'
    };
    component.corp = corp;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
