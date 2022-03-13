import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataCyberware } from './../../shared/cp2020/cp2020-cyberware/models/data-cyberware';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Gear, CyberDeck } from './../../shared/models/gear';
import { DataService, JsonDataFiles } from './../../shared/services/file-services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionComponent } from 'ngx-bootstrap/accordion';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prot-gear',
  templateUrl: './prot-gear.component.html',
  styleUrls: ['./prot-gear.component.css']
})
export class ProtGearComponent implements OnInit {

  @ViewChild('accordion', {static: false}) accordion: AccordionComponent;
    proteusEquipment$: Observable<{
      Gear: Array<Gear>,
      Cyberware: Array< DataCyberware>,
      Cyberdeck: Array<CyberDeck>,
      Cyberdeck_Option: Array<Gear>,
     }>;
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
    this.proteusEquipment$ = this.dataService
      .GetJson(JsonDataFiles.CP2020_PROTEUS_GEAR_JSON)
      .pipe(map( data => data.gear));
  }


}
