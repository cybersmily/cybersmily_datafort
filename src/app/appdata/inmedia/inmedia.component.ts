import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/services/file-services';

@Component({
  selector: 'app-inmedia',
  templateUrl: './inmedia.component.html',
  styleUrls: ['./inmedia.component.css'],
})
export class InmediaComponent implements OnInit {
  constructor(private dataService: DataService, private seo: SeoService) {}

  books: Array<mediaItem>;
  movies: Array<mediaItem>;
  anime: Array<mediaItem>;
  series: Array<mediaItem>;

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk in the Media',
      "2020-07, Cybersmily's Datafort Cyberpunk In the Media. Lists movies, tv series, books, anime and web series for inspiration."
    );
    this.getMedia();
  }
  private getMedia(): void {
    this.dataService
      .GetJson<mediaSections>(JsonDataFiles.CP2020_INMEDIA_JSON)
      .subscribe(
        (resultObj) => {
          this.books = resultObj.books;
          this.movies = resultObj.movies;
          this.anime = resultObj.anime;
          this.series = resultObj.series;
        },
        (error) => console.error('Error while getting Media.', error)
      );
  }
}

export interface mediaItem {
  title: string;
  description: string;
}

export interface mediaSections {
  books: Array<mediaItem>;
  movies: Array<mediaItem>;
  anime: Array<mediaItem>;
  series: Array<mediaItem>;
}
