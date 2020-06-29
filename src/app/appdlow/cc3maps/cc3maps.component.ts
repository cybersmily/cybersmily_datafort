import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cc3maps',
  templateUrl: './cc3maps.component.html',
  styleUrls: ['./cc3maps.component.css']
})
export class Cc3mapsComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 CC3 Maps',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Campaign Cartographer 3 maps of Night City and the NorCal.'
    );
  }

}
