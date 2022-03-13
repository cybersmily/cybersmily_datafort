import { Observable } from 'rxjs';
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

  gangs$: Observable<Array<{name:string, type: string, file:string}>>;

  gang$: Observable<GangData>;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(private dataService: DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.gangs$ = this.dataService.GetJson(JsonDataFiles.CP_GANGS_JSON);
  }

  openModal(template: TemplateRef<any>, fileName: string) {
    this.gang$ = this.dataService.GetJson(`${JsonDataFiles.CP_GANGS_PATH}${fileName}.json`);
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }


}
