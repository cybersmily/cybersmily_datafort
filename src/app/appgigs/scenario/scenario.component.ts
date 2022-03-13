import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cs-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  scenarioHTML$: Observable<string>;
  constructor(private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Scenarios',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Scenarios are some homebrew scenarios.'
    );
    this.getScenario();
  }

  private LoadHTMLFile(url: string) {
    this.scenarioHTML$ = this.dataService
    .GetHTML(`/html/gigs/${url}.htm`);
  }

  private getScenario(): void {
    this.activatedRoute.url.subscribe(
      (url) => this.LoadHTMLFile(url[0].path),
      error => console.log( 'Error :: ' + error)
    );
  }

}
