import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { AccordionModule } from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { DataService } from './../../shared/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const newsJson = {
  newsItems: [
    {
      date: '2019-08',
      entries: [
        'Testing the news items.',
        'Another line of news.'
      ]
    },
    {
      date: '2019-09',
      entries: [
        'another testing the news items.',
        'Another line of news.'
      ]
    }]
  };

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsComponent
      ],
      imports: [
        CommonUiModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
