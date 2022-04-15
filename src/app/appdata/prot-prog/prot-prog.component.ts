import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import { ProgramGroup } from '../../shared/models/gear';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faAngleDoubleDown,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prot-prog',
  templateUrl: './prot-prog.component.html',
  styleUrls: ['./prot-prog.component.css'],
})
export class ProtProgComponent implements OnInit {
  @ViewChild('accordion', { static: false }) accordion: AccordionComponent;
  programList$: Observable<Array<ProgramGroup>>;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Proteus Program List',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Proteus Program List is a complied list of gear from the Netrunner TCG expansion converted into Cyberpunk 2020 stats."
    );
    this.getProgramList();
  }

  private getProgramList(): void {
    this.programList$ = this.dataService
      .GetJson<{ programs: Array<ProgramGroup> }>(
        JsonDataFiles.CP2020_PROTEUS_PROGRAMS_JSON
      )
      .pipe(map((data) => data.programs));
  }
}
