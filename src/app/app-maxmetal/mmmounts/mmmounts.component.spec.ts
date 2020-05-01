import { AccordionModule, CollapseModule } from 'ngx-bootstrap';
import { DataService } from './../../shared/services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmmountsComponent } from './mmmounts.component';
import { MmmountComponent } from '../mmmount/mmmount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('MmmountsComponent', () => {
  let component: MmmountsComponent;
  let fixture: ComponentFixture<MmmountsComponent>;
  let httpClientSpy: { get: jasmine.Spy};
  let dataservice: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmmountsComponent,
        MmmountComponent
      ],
      imports: [
        FontAwesomeModule,
        HttpClientTestingModule,
        CollapseModule,
        AccordionModule
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
