import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-nrmain',
  templateUrl: './nrmain.component.html',
  styleUrls: ['./nrmain.component.css']
})
export class NrmainComponent implements OnInit {
  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Netrun Navigator',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Netrun Navigator is an application to track and do a Netrun. The Netrunner clicks on the map and hacks the LDLs to get to the various locations.'
    );
  }

}
