import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { NewsArticle } from '../../shared/models/articles';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newItems: NewsArticle[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetDataNews()
    .subscribe( data => {
      this.newItems = data.news;
    });
  }

}
