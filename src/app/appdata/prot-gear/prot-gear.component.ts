import { DataCyberware } from './../../shared/models/cyberware';
import { Gear, CyberDeck } from './../../shared/models/gear';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionComponent } from 'ngx-bootstrap';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prot-gear',
  templateUrl: './prot-gear.component.html',
  styleUrls: ['./prot-gear.component.css']
})
export class ProtGearComponent implements OnInit {

  @ViewChild('accordion') accordion: AccordionComponent;
    gearList: Gear[];
    cyberwareList: DataCyberware[];
    cyberDeckList: CyberDeck[];
    cyberDeckOptionList: Gear[];
    faAngleDoubleDown = faAngleDoubleDown;
    faAngleDoubleRight = faAngleDoubleRight;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getGear();
  }

  private getGear(): void {
    this.dataService
      .GetJson('/json/data/proteus-gear.json')
      .subscribe(
        resultObj => {
          this.gearList = resultObj.gear.Gear;
          this.cyberwareList = resultObj.gear.Cyberware;
          this.cyberDeckList = resultObj.gear.Cyberdeck;
          this.cyberDeckOptionList = resultObj.gear.Cyberdeck_Option;
        },
        error => console.log( 'Error :: ' + error)
      );
  }


}
