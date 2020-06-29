import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-fixer-calc-main',
  templateUrl: './fixer-calc-main.component.html',
  styleUrls: ['./fixer-calc-main.component.css']
})
export class FixerCalcMainComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Fixer Calculator',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Fixer Calculator is an application to generate a Fixer character contacts using the Wildside supplement.'
    );
  }

}
