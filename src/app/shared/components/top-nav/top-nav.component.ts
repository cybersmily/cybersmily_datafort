import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { TopNavLinks } from './../../Models/TopNavLinks';
import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faDiscord,
  faGithub,
  faReddit,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  faEnvelope = faEnvelope;
  faGithub = faGithub;
  faDiscord = faDiscord;
  faReddit = faReddit;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  topNavLinks: TopNavLinks = new TopNavLinks();
  isCollapsed = true;
  isFullMenu = true;

  selected: any;
  constructor() {
    this.topNavLinks = new TopNavLinks();
  }

  ngOnInit() {}

  /**
   * sendEmail redirects the browser to mailto
   *
   * @memberof TopNavComponent
   */
  sendEmail(): void {
    window.location.href = 'mailto:cybersmily@cybersmily.net';
  }

  isExternal(url: string): boolean {
    return url.indexOf('http') > -1;
  }
}
