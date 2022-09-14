import { faDice } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { CpRedWoundsManagerService } from './../../services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  CpRedCharacterAddiction,
  CpRedCharacterCriticalInjury,
  CpRedCharacterWounds,
  CP_RED_WOUND_LEVELS,
} from '../../models';

@Component({
  selector: 'cs-cp-red-wounds-display',
  templateUrl: './cp-red-wounds-display.component.html',
  styleUrls: ['./cp-red-wounds-display.component.css'],
})
export class CpRedWoundsDisplayComponent implements OnInit {
  faDice = faDice;

  wounds$: Observable<CpRedCharacterWounds>;
  notWounded = CP_RED_WOUND_LEVELS.NONE;
  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-left',
    animated: true,
  };

  constructor(
    private woundsManager: CpRedWoundsManagerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.wounds$ = this.woundsManager.wounds$.pipe(
      map((wounds) => {
        return wounds;
      })
    );
  }

  updateCurrHitPoints(event: any): void {
    const hp = event?.target?.value;
    if (!isNaN(hp)) {
      this.woundsManager.updateCurrentHitPoints(hp);
    }
  }

  woundLevelClass(level: CP_RED_WOUND_LEVELS): string {
    switch (level) {
      case CP_RED_WOUND_LEVELS.LIGHTLY:
        return 'bg-success';
      case CP_RED_WOUND_LEVELS.MORTALLY:
        return 'bg-danger';
      case CP_RED_WOUND_LEVELS.SERIOUSLY:
        return 'bg-warning';
      default:
        return 'bg-light';
    }
  }

  currentInjuries(injuries: Array<CpRedCharacterCriticalInjury>): string {
    return injuries.map((inj) => inj.name).join(', ');
  }

  currentAddictions(addictions: Array<CpRedCharacterAddiction>): string {
    return addictions.map((add) => add.name).join(', ');
  }

  showModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }
}
