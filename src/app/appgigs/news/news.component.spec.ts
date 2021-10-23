import { CommonUiModule } from './../../shared/modules/common-ui/common-ui.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { DataService } from './../../shared/services/file-services';
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

  beforeEach(waitForAsync(() => {
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
