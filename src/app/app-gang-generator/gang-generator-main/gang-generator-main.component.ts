import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-gang-generator-main',
    templateUrl: './gang-generator-main.component.html',
    styleUrls: ['./gang-generator-main.component.css'],
    standalone: false
})
export class GangGeneratorMainComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMeta(
      'Gang Generator for Cyberpunk 2020/Cyberpunk Red',
      "2022-08, Cybersmily's Datafort Gang Generator is an application to generate a gang(s) for a Cyberpunk 2020 or Cyberpunk Red game."
    );
  }
}
