import { Cp2020ProgramList } from './../../shared/models/netrun/cp2020-program-list';
import { faTrash, faFilePdf, faSave, faUndo, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NetRunProgram } from './../../shared/models/netrun';

@Component({
  selector: 'cs-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  faTrash = faTrash;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faUpload = faUpload;
  faPlus = faPlus;

  program: NetRunProgram = new NetRunProgram();

  modalTitle = 'New';

  @Input()
  programList: Cp2020ProgramList = new Cp2020ProgramList();

  @Input()
  maxMu = 0;

  @Output()
  updateList: EventEmitter<Cp2020ProgramList> = new EventEmitter<Cp2020ProgramList>();

  constructor() { }

  ngOnInit(): void {
  }

  delete(index: number) {
    this.programList.removeByIndex(index);
    this.updateList.emit(this.programList);
  }

  select(index: number) {
    this.modalTitle = 'Selected';
    this.program = this.programList.getByIndex(index);
  }

  createNew() {
    this.modalTitle = 'New';
    this.program = new NetRunProgram();
  }

  load(index: number) {
    this.programList.setLoaded(index);
    this.updateList.emit(this.programList);
  }

  update(prog: NetRunProgram) {
    this.programList.updateProgram(prog);
    this.updateList.emit(this.programList);
  }
}
