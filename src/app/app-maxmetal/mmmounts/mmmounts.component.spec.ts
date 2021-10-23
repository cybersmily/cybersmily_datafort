import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { DataService } from './../../shared/services/file-services';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MmmountsComponent } from './mmmounts.component';
import { MmmountComponent } from '../mmmount/mmmount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MmmountsComponent', () => {
  let component: MmmountsComponent;
  let fixture: ComponentFixture<MmmountsComponent>;
  let httpClientSpy: { get: jasmine.Spy};
  let dataservice: DataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmmountsComponent,
        MmmountComponent
      ],
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
    fixture = TestBed.createComponent(MmmountsComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    dataservice = new DataService(<any>httpClientSpy);
    component = new MmmountsComponent(dataservice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
