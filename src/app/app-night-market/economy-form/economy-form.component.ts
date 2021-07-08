import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-economy-form',
  templateUrl: './economy-form.component.html',
  styleUrls: ['./economy-form.component.css']
})
export class EconomyFormComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Cyberpunk Red Economy Generators',
      '2021-07, Cybersmily\'s Datafort Cyberpunk Red Economy is an unofficial application to generate a Night Markets, Bodegas, and Vendits from the base book.'
    );
  }

}
