import { faDice } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { CpRedStat, CpRedCharacterStat } from '../../models';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cs-cp-red-stat',
  templateUrl: './cp-red-stat.component.html',
  styleUrls: ['./cp-red-stat.component.css'],
})
export class CPRedStatComponent implements OnInit {
  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-right',
    animated: true,
  };
  faDice = faDice;

  @Input()
  stat: CpRedStat = new CpRedCharacterStat();

  @Output()
  updateStat: EventEmitter<CpRedStat> = new EventEmitter<CpRedStat>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
