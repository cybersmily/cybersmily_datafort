import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cs-nrinstruct',
    templateUrl: './nrinstruct.component.html',
    styleUrls: ['./nrinstruct.component.css'],
    standalone: false
})
export class NrinstructComponent implements OnInit {
  modalRef: BsModalRef;
  modalConfig: {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor( private bsModalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template, this.modalConfig);
  }

}
