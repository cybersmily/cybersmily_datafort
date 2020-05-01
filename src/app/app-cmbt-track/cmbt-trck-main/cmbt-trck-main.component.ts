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

  constructor() { }

  ngOnInit() {
  }

}
