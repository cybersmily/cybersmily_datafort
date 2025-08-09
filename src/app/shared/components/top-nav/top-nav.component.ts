import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { TopNavLinks } from '../../models';
import { Component, OnInit, TemplateRef } from '@angular/core';
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
    standalone: false
})
export class TopNavComponent implements OnInit {
  faEnvelope = faEnvelope;
  faGithub = faGithub;
  faDiscord = faDiscord;
  faReddit = faReddit;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTimes = faTimes;

  topNavLinks: TopNavLinks = new TopNavLinks();
  isCollapsed = true;
  isFullMenu = true;

  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-right modal-lg',
    animated: true,
  };

  selected: any;
  constructor(private modalService: BsModalService) {
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

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
