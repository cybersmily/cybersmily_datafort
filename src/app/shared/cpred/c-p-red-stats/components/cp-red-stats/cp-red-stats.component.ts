import { Observable, map } from 'rxjs';
import { CpRedStatsManagerService } from './../../services/cp-red-stats-manager/cp-red-stats-manager.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'cs-cp-red-stats',
  templateUrl: './cp-red-stats.component.html',
  styleUrls: ['./cp-red-stats.component.css'],
})
export class CpRedStatsComponent implements OnInit {
  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-left modal-sm',
    animated: true,
  };

  constructor(
    private modalService: BsModalService,
    private statManager: CpRedStatsManagerService
  ) {}

  get statNames(): Observable<Array<string>> {
    return this.statManager.characterStats.pipe(
      map((stats) => Object.keys(stats))
    );
  }

  ngOnInit(): void {}

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
