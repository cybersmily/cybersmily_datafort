import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { AccordionComponent } from 'ngx-bootstrap';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'cs-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;
  @ViewChild('accordion') accordion: AccordionComponent;

  newsItems: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.dataService.GetJson('/json/gigs/news.json').subscribe((news) => {
      this.newsItems = news.news;
    });
  }

}
