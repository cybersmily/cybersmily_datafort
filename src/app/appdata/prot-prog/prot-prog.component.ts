import { AccordionComponent } from 'ngx-bootstrap';
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
  @ViewChild('accordion') accordion: AccordionComponent;
  programList: ProgramGroup[];
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProgramList();
  }

  private getProgramList(): void {
    this.dataService
      .GetJson('/json/data/proteus-progm.json')
      .subscribe(
        resultObj => {
          this.programList = resultObj.programs;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
