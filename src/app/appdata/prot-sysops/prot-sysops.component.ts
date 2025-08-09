import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {} from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Sysop } from '../../shared/models/character';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-prot-sysops',
    templateUrl: './prot-sysops.component.html',
    styleUrls: ['./prot-sysops.component.css'],
    standalone: false
})
export class ProtSysopsComponent implements OnInit {
  sysopsList$: Observable<Array<Sysop>>;

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Proteus Sysop List',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Proteus Sysop List is a complied list of gear from the Netrunner TCG expansion converted into Cyberpunk 2020 stats."
    );
    this.getSysopList();
  }

  private getSysopList(): void {
    this.sysopsList$ = this.dataService
      .GetJson<{ sysops: Array<Sysop> }>(
        JsonDataFiles.CP2020_PROTEUS_SYSOPS_JSON
      )
      .pipe(map((data) => data.sysops));
  }
}
