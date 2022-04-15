import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-corporations',
  templateUrl: './corporations.component.html',
  styleUrls: ['./corporations.component.css'],
})
export class CorporationsComponent implements OnInit {
  coporations$: Observable<{ name: string; img: string; slogan: string }>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.coporations$ = this.dataService
      .GetJson<{ corporations: { name: string; img: string; slogan: string } }>(
        '/json/peeps/corporations.json'
      )
      .pipe(map((data) => data.corporations));
  }
}
