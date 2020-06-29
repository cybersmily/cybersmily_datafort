import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-jpgmaps',
  templateUrl: './jpgmaps.component.html',
  styleUrls: ['./jpgmaps.component.css']
})
export class JpgmapsComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Night City JPG Maps',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Night City jpg maps of districts and areas of influence.'
    );
  }

}
