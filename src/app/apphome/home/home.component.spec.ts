import { News } from '../../shared/models/articles/news';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './../../shared/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: DataService;

  const newsData: News = {
    news: [
      { date: '2019-01-01', entries: [
        'test one',
        'test two'
      ]},
      { date: '2019-02-02', entries: [
        'test three',
        'test four'
      ]},
      { date: '2019-03-03', entries: [
        'test five',
        'test six'
      ]}
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load news articles', () => {
    dataService = new DataService(null);
    const homeComoponent = new HomeComponent(dataService);
    spyOn(dataService, 'GetDataNews').and.returnValue(of(newsData));
    homeComoponent.ngOnInit();
    expect(homeComoponent.newItems).toBeTruthy();
    expect(homeComoponent.newItems.length).toEqual(3);
    expect(homeComoponent.newItems[2].date).toEqual('2019-03-03');
    expect(homeComoponent.newItems[0].entries.length).toEqual(2);
  });
});
