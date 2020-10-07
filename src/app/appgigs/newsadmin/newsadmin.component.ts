import { NewsReport } from './../../shared/models/gigs/news-report';
import { NewsItem } from './../../shared/models/gigs/news-item';
import { JsonDataFiles } from './../../shared/json-data-files';
import { GigNewsItem } from './../../shared/models/gigs/gig-news-item';
import { SaveFileService } from './../../shared/services/save-file.service';
import { DataService } from './../../shared/services/data.service';
import { faAngleDoubleDown, faAngleDoubleRight, faPlus, faTrash, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
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

  newsItems: GigNewsItem = new GigNewsItem();

  newNewsItem: NewsItem = { title: '', reports: new Array<NewsReport>()};
  newNewsReport: NewsReport = {img: 'tphillips', reporter: 'Tom Phillps', commentary: ''};

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

  constructor(private dataService: DataService, private saveService: SaveFileService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.dataService
    .GetJson(JsonDataFiles.GIG_NEWS_JSON)
    .subscribe((news) => {
      this.newsItems = news;
    });
  }

  saveFile() {
    this.saveService.SaveAsFile('news', JSON.stringify(this.newsItems), 'json');
  }

  addNewNewsItem() {
    this.newsItems.news.push({
      title: this.newNewsItem.title,
      reports: [...this.newNewsItem.reports]
    });
    this.newNewsItem = { title: '', reports: new Array<NewsReport>()};
  }

  addNewReport() {
    this.newNewsItem.reports.push({
      img: this.newNewsReport.img,
      reporter: this.newNewsReport.reporter,
      commentary: this.newNewsReport.commentary
    });
    this.newNewsReport = {img: 'tphillips', reporter: 'Tom Phillps', commentary: ''};
  }
  deleteNewNewsReport(index: number) {
    this.newNewsItem.reports.splice(index, 1);
  }

  deleteNewsReport(i: number, ri: number) {
    this.newsItems.news[i].reports.splice(ri, 1);
  }

  addReport(i) {
    this.newsItems.news[i].reports.push({
      img: this.newNewsReport.img,
      reporter: this.newNewsReport.reporter,
      commentary: this.newNewsReport.commentary
    });
  }

}
