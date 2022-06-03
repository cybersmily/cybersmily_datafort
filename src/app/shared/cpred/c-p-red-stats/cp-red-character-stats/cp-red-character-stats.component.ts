import { faDice } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CpRedStats, CpRedCharacterStats } from './../../models';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-stats',
  templateUrl: './cp-red-character-stats.component.html',
  styleUrls: ['./cp-red-character-stats.component.css'],
})
export class CpRedCharacterStatsComponent implements OnInit {
  faDice = faDice;
  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-left modal-sm',
    animated: true,
  };

  @Input()
  stats: CpRedStats = new CpRedCharacterStats();

  @Output()
  updateStats: EventEmitter<CpRedStats> = new EventEmitter<CpRedStats>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
