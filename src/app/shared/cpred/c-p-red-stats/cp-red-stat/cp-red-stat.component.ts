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
  @Input()
  stat: CpRedStat = new CpRedCharacterStat();

  constructor() {}

  ngOnInit(): void {}
}
