import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/file-services';
import { NewsArticle } from '../../shared/models/articles';

@Component({
    selector: 'cs-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  newItems: NewsArticle[] = [];
  showMoreItems: boolean = false;
  moreItems: NewsArticle[] = [];
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.GetDataNews().subscribe((data) => {
      this.newItems = data.news.slice(0, 1);
      this.moreItems = data.news.slice(1);
    });
  }
}
