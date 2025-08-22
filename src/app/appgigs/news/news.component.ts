import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewsReport } from './../../shared/models/gigs/news-report';
import { NewsItems } from './../../shared/models/gigs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DataService,
  JsonDataFiles,
} from '../../shared/services/file-services';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import {
  faAngleDoubleDown,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'cs-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    standalone: false
})
export class NewsComponent implements OnInit {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;
  @ViewChild('accordion', { static: false }) accordion: AccordionComponent;

  newsItems$: Observable<NewsItems>;
  selectedReporter = '';
  searchText = '';
  isOpen = false;

  reporters: Array<string> = [
    'Tom Phillips',
    'Isha Tomoda',
    'Porche Hendricks',
    'Harden Torres',
    'Glit G',
    'Mayor Ebunike',
    'Assistant Mayor Haakenson',
    'Mac V',
  ];

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 News',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 News are blurbs from Night City nightly teams team."
    );
    this.loadNews();
  }
  getFilteredReports(reports: Array<NewsReport>): Array<NewsReport> {
    if (this.selectedReporter === '' && this.searchText === '') {
      return reports;
    }
    return reports
      .filter(
        (rpt) =>
          (this.selectedReporter !== '' &&
            rpt.reporter === this.selectedReporter) ||
          this.selectedReporter === ''
      )
      .filter(
        (rpt) =>
          (this.searchText !== '' &&
            rpt.commentary
              .toLowerCase()
              .includes(this.searchText.toLowerCase())) ||
          this.searchText === ''
      );
  }

  loadNews() {
    this.newsItems$ = this.dataService
      .GetJson<{ news: any }>(JsonDataFiles.GIG_NEWS_JSON)
      .pipe(
        map((data) => data.news.sort((a, b) => b.title.localeCompare(a.title)))
      );
  }
}
