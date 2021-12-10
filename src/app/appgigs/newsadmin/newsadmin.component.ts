import { NewsReport } from './../../shared/models/gigs/news-report';
import { NewsItem } from './../../shared/models/gigs/news-item';
import { GigNewsItem } from './../../shared/models/gigs/gig-news-item';
import { SaveFileService } from './../../shared/services/file-services';
import { DataService, JsonDataFiles } from './../../shared/services/file-services';
import { faAngleDoubleDown, faAngleDoubleRight, faPlus, faTrash, faPen, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-newsadmin',
  templateUrl: './newsadmin.component.html',
  styleUrls: ['./newsadmin.component.css']
})
export class NewsadminComponent implements OnInit {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;
  faPlus = faPlus;
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  faUpload = faUpload;
  isOpen = false;

  newsItems: GigNewsItem = new GigNewsItem();
  key: string = 'wnsnews_adm';

  newNewsItem: NewsItem = { title: 'Nightly Report 2022-00-00', reports: new Array<NewsReport>()};
  newNewsReport: NewsReport = {img: 'tphillips', reporter: 'Tom Phillips', commentary: ''};

  rprtrs: Array<{img: string, reporter: string}> = [
    { img: 'tphillips',  reporter: 'Tom Phillips'},
    { img: 'itomoda',  reporter: 'Isha Tomoda'},
    { img: 'phendricks',  reporter: 'Porche Hendricks'},
    { img: 'htorres',  reporter: 'Harden Torres'},
    { img: 'glitg',  reporter: 'Glit G'},
    { img: 'mayor',  reporter: 'Mayor Ebunike'},
    { img: 'asstmayor' ,  reporter: 'Assistant Mayor Haakenson'},
    { img: 'macv',  reporter:  'Mac V'}
  ];

  images: Array<string> = [
    'tphillips',
    'itomoda',
    'phendricks',
    'htorres',
    'glitg',
    'mayor',
    'asstmayor',
    'macv'
  ];

  reporters: Array<string> = [
    'Tom Phillips',
    'Isha Tomoda',
    'Porche Hendricks',
    'Harden Torres',
    'Glit G',
    'Mayor Ebunike',
    'Assistant Mayor Haakenson',
    'Mac V'
  ];

  selectedReporter = '';
  searchText = '';
  storageKey = 'wns_news_items';


  constructor(private dataService: DataService, private saveService: SaveFileService) { }

  ngOnInit(): void {
    const news = JSON.parse(window.localStorage.getItem(this.storageKey));
    if(news) {
      news.news = news.news.sort( (a, b) => b.title.localeCompare(a.title));
      this.newsItems = news;
      this.newNewsItem.reports.push({img: 'tphillips', reporter: 'Tom Phillips', commentary: 'Hello Night City and welcome to WNS 7 News Force team. I\'m Tom Phillips.<br/>'});
    } else {
      this.loadNews();
    }
  }

  loadNews() {
    this.dataService
    .GetJson(JsonDataFiles.GIG_NEWS_JSON)
    .subscribe((news: GigNewsItem) => {
      news.news = news.news.sort( (a, b) => b.title.localeCompare(a.title));
      this.newsItems = news;
      this.newNewsItem.reports.push({img: 'tphillips', reporter: 'Tom Phillips', commentary: 'Hello Night City and welcome to WNS 7 News Force team. I\'m Tom Phillips.<br/>'});
    });
  }

  update() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.newsItems));
  }


  getFilteredReports(reports:Array<NewsReport>):Array<NewsReport> {
    if (this.selectedReporter === '' && this.searchText === '') {
      return reports;
    }
    return reports.filter(rpt => rpt.reporter === this.selectedReporter);
  }

  saveFile() {
    this.update();
    this.saveService.SaveAsFile('news', JSON.stringify(this.newsItems), 'json');
  }

  addNewNewsItem() {
    this.newsItems.news.push({
      title: this.newNewsItem.title,
      reports: [...this.newNewsItem.reports]
    });
    this.newNewsItem = { title: 'Nightly Report 2022-00-00', reports: new Array<NewsReport>()};
    this.newNewsItem.reports.push({img: 'tphillips', reporter: 'Tom Phillips', commentary: 'Hello Night City and welcome to WNS 7 News Force team. I\'m Tom Phillips.<br/>'});
    this.update();
  }

  addNewReport() {
    const reporter = this.rprtrs.find( r => r.reporter === this.newNewsReport.reporter);
    this.newNewsItem.reports.push({
      img: reporter.img,
      reporter: reporter.reporter,
      commentary: this.newNewsReport.commentary
    });
    this.newNewsReport = {img: 'tphillips', reporter: 'Tom Phillips', commentary: ''};
    this.update();
  }

  deleteNewNewsReport(index: number) {
    this.newNewsItem.reports.splice(index, 1);
    this.update();
  }

  deleteNewsReport(i: number, ri: number) {
    this.newsItems.news[i].reports.splice(ri, 1);
    this.update();
  }

  deleteReport(i: number) {
    this.newsItems.news.splice(i, 1);
    this.update();
  }

  addReport(i) {
    const reporter = this.rprtrs.find( r => r.reporter === this.newNewsReport.reporter);
    this.newsItems.news[i].reports.push({
      img: reporter.img,
      reporter: this.newNewsReport.reporter,
      commentary: this.newNewsReport.commentary
    });
    this.newNewsReport = {img: 'tphillips', reporter: 'Tom Phillips', commentary: ''};
    this.update();
  }

  changeReporter(event, newsIndex: number, reportIndex: number) {
    const reporter = this.newsItems.news[newsIndex].reports[reportIndex].reporter;
    const img = this.rprtrs.find( r => r.reporter === reporter).img;
    this.newsItems.news[newsIndex].reports[reportIndex].img = img;
    this.update();
  }

  changeNewReport(event) {
    const reporter = this.newNewsReport.reporter;
    const img = this.rprtrs.find( r => r.reporter === reporter).img;
    this.newNewsReport.img = img;
    this.update();
  }

  changeReporterOnNew(event, reportIndex: number) {
    const reporter = this.newNewsItem.reports[reportIndex].reporter;
    const img = this.rprtrs.find( r => r.reporter === reporter).img;
    this.newNewsItem.reports[reportIndex].img = img;
    this.update();
  }


}
