import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/services/file-services';

@Component({
  selector: 'app-inmedia',
  templateUrl: './inmedia.component.html',
  styleUrls: ['./inmedia.component.css']
})
export class InmediaComponent implements OnInit {

  constructor(private dataService: DataService, private seo: SeoService) { }

  books: {title: string; description: string; }[];
  movies: {title: string; description: string; }[];
  anime: {title: string; description: string; }[];
  series: {title: string; description: string; }[];

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk in the Media',
      '2020-07, Cybersmily\'s Datafort Cyberpunk In the Media. Lists movies, tv series, books, anime and web series for inspiration.'
    );
    this.getMedia();
  }
  private getMedia(): void {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_INMEDIA_JSON)
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
