import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-datafort-designer-main',
    templateUrl: './datafort-designer-main.component.html',
    styleUrls: ['./datafort-designer-main.component.css'],
    standalone: false
})
export class DatafortDesignerMainComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Datafort Designer for Cyberpunk 2020',
      '2022-03, Cybersmily\'s Datafort Datafort Designer utility for Cyberpunk 2020 using the base book.'
    );
  }

}
