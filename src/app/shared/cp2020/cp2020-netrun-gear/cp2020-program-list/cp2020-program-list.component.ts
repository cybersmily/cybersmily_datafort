import { DND_TYPE_CP2020_PROGRAM } from './../../../models/constants';
import { DndDropEvent, EffectAllowed } from 'ngx-drag-drop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020ProgramList } from '../models';
import {
  faTrash,
  faFilePdf,
  faSave,
  faUndo,
  faUpload,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Cp2020Program } from '../models';

@Component({
    selector: 'cs-program-list',
    templateUrl: './cp2020-program-list.component.html',
    styleUrls: ['./cp2020-program-list.component.css'],
    standalone: false
})
export class Cp2020ProgramListComponent implements OnInit {
  faTrash = faTrash;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faUpload = faUpload;
  faPlus = faPlus;
  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-lg modal-right',
  };

  program: Cp2020Program = new Cp2020Program();

  modalTitle = 'New';
  dndType = DND_TYPE_CP2020_PROGRAM;

  @Input()
  programList: Cp2020ProgramList = new Cp2020ProgramList();

  @Input()
  maxMu = 0;

  @Output()
  updateList: EventEmitter<Cp2020ProgramList> = new EventEmitter<Cp2020ProgramList>();

  @ViewChildren('programNameElem')
  programNameListElem: QueryList<ElementRef>;

  @ViewChild('newProgramElem', { static: false })
  newButton: ElementRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  delete(index: number) {
    this.programList.removeByIndex(index);
    this.updateList.emit(this.programList);
    this.setFocus(index);
  }

  setFocus(index?: number) {
    if (index > -1 && this.programNameListElem.length > index) {
      this.programNameListElem.toArray()[index].nativeElement.focus();
    } else {
      this.newButton.nativeElement.focus();
    }
  }

  showSelect(index: number, template) {
    this.modalTitle = 'Selected';
    this.program = this.programList.getByIndex(index);
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHidden.subscribe(() => {
      this.setFocus(index);
    });
  }

  showNew(template: TemplateRef<any>) {
    this.modalTitle = 'New';
    this.program = new Cp2020Program();
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHidden.subscribe(() => {
      this.programNameListElem.last.nativeElement.focus();
    });
  }

  load(index: number) {
    this.programList.setLoaded(index);
    this.updateList.emit(this.programList);
  }

  update(prog: Cp2020Program) {
    this.programList.updateProgram(prog);
    this.modalRef?.hide();
    this.updateList.emit(this.programList);
  }

  onDrop(event: DndDropEvent): void {
    if(event.data.type === DND_TYPE_CP2020_PROGRAM) {
    }
  }
}
