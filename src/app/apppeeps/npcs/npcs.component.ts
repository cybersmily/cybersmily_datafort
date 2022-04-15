import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { DataService } from './../../shared/services/file-services';
import { NpcCard } from '../../shared/models/character';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cs-npcs',
  templateUrl: './npcs.component.html',
  styleUrls: ['./npcs.component.css'],
})
export class NpcsComponent implements OnInit {
  npcRoster$: Observable<Array<NpcCard>>;
  currNpcs: string;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Peeps',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Peeps are NPCs from the various campaigns and scenarios over the years."
    );
    this.getNpcs();
  }

  private LoadRosterFile(url: string) {
    this.npcRoster$ = this.dataService
      .GetJson<{ npcs: Array<NpcCard> }>(`/json/peeps/${url}.json`)
      .pipe(map((data) => data.npcs));
  }

  private getNpcs(): void {
    this.activatedRoute.url.subscribe(
      (url) => this.LoadRosterFile(url[0].path),
      (error) =>
        console.error('Error :: attempting to load roster files.', error)
    );
  }
}
