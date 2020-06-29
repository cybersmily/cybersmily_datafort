import { SeoService } from './../../shared/services/seo/seo.service';
import { faAngleDoubleRight, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-main',
  templateUrl: './cmbt-trck-main.component.html',
  styleUrls: ['./cmbt-trck-main.component.css']
})
export class CmbtTrckMainComponent implements OnInit {
  isCollapsed = true;
  isLeftCollapsed = true;
  isRightCollapsed = true;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleDown = faAngleDoubleDown;

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Combat Tracker',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Combat Tracker is an application to track opponents during comabt in Cyberpunk 2020.'
    );
  }

}
