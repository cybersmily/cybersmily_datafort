import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-inmedia',
  templateUrl: './inmedia.component.html',
  styleUrls: ['./inmedia.component.css']
})
export class InmediaComponent implements OnInit {

  constructor(private dataService: DataService) { }

  books: {title: string; description: string; }[];
  movies: {title: string; description: string; }[];
  anime: {title: string; description: string; }[];
  series: {title: string; description: string; }[];

  ngOnInit() {
    this.getMedia();
  }
  private getMedia(): void {
    this.dataService
      .GetJson('/json/data/inmedia.json')
      .subscribe(
        resultObj => {
          this.books = resultObj.books;
          this.movies = resultObj.movies;
          this.anime = resultObj.anime;
          this.series = resultObj.series;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
