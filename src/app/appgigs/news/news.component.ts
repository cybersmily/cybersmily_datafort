import { NewsItems } from './../../shared/models/gigs';
import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/file-services/data.service';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'cs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;
  @ViewChild('accordion', {static: false}) accordion: AccordionComponent;

  newsItems: NewsItems;
  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 News',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 News are blurbs from Night City nightly teams team.'
    );
    this.loadNews();
  }

  loadNews() {
    this.dataService
    .GetJson(JsonDataFiles.GIG_NEWS_JSON)
    .subscribe((news) => {
      this.newsItems = news.news.sort((a, b) => b.title.localeCompare(a.title));
    });
  }

}
