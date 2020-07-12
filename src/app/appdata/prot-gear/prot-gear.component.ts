import { JsonDataFiles } from './../../shared/json-data-files';
import { SeoService } from './../../shared/services/seo/seo.service';
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

  @ViewChild('accordion', {static: false}) accordion: AccordionComponent;
    gearList: Gear[];
    cyberwareList: DataCyberware[];
    cyberDeckList: CyberDeck[];
    cyberDeckOptionList: Gear[];
    faAngleDoubleDown = faAngleDoubleDown;
    faAngleDoubleRight = faAngleDoubleRight;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Proteus Gear List',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Proteus Gear List is a complied list of gear from the Netrunner TCG expansion converted into Cyberpunk 2020 stats.'
    );
    this.getGear();
  }

  private getGear(): void {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_PROTEUS_GEAR_JSON)
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
