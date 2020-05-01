import { TopNavLinks } from './../../Models/TopNavLinks';
import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  faEnvelope = faEnvelope;
  topNavLinks: TopNavLinks = new TopNavLinks();
  isCollapsed = true;
  constructor() {
    this.topNavLinks = new TopNavLinks();
  }

  ngOnInit() {
  }

  /**
   * sendEmail redirects the browser to mailto
   *
   * @memberof TopNavComponent
   */
  sendEmail(): void {
    window.location.href = 'mailto:cybersmily@cybersmily.net';
  }

  isExternal(url: string): boolean {
    return (url.indexOf('http') > -1);
  }

}

