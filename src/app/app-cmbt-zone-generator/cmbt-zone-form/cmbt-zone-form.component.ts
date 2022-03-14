import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cmbt-zone-form',
  templateUrl: './cmbt-zone-form.component.html',
  styleUrls: ['./cmbt-zone-form.component.css']
})
export class CmbtZoneFormComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Combat Zone Generator for Cyberpunk 2020/Red',
      '2022-03, Cybersmily\'s Datafort Combat Zone Generator utility for Cyberpunk 2020/Red.'
    );
  }

}
