import { JsonDataFiles } from './../../shared/json-data-files';
import { SeoService } from './../../shared/services/seo/seo.service';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import { ProgramGroup, Program } from '../../shared/models/gear';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prot-prog',
  templateUrl: './prot-prog.component.html',
  styleUrls: ['./prot-prog.component.css']
})
export class ProtProgComponent implements OnInit {
  @ViewChild('accordion', {static: false}) accordion: AccordionComponent;
  programList: ProgramGroup[];
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Proteus Program List',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Proteus Program List is a complied list of gear from the Netrunner TCG expansion converted into Cyberpunk 2020 stats.'
    );
    this.getProgramList();
  }

  private getProgramList(): void {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_PROTEUS_PROGRAMS_JSON)
      .subscribe(
        resultObj => {
          this.programList = resultObj.programs;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
