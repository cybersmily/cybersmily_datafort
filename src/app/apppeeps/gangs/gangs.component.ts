import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { JsonDataFiles, DataService } from './../../shared/services/file-services';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { GangData } from './../../shared/models/gang/gang-data';

@Component({
  selector: 'cs-gangs',
  templateUrl: './gangs.component.html',
  styleUrls: ['./gangs.component.css']
})
export class GangsComponent implements OnInit {

  gangs: Array<any> = new Array<any>();

  gang: GangData;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(private dataService: DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CP_GANGS_JSON).subscribe( data => {
      this.gangs = data;
    });
  }

  openModal(template: TemplateRef<any>, fileName: string) {
    this.dataService.GetJson(`${JsonDataFiles.CP_GANGS_PATH}${fileName}.json`).subscribe( data => {
      this.gang = data;
      this.modalRef = this.modalService.show(template, this.modalConfig);
    });
  }

  closeModal() {
    this.modalRef.hide();
  }


}
