import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faDiceSix, faSave } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { NrProgramOptionsService } from './../../shared/services/netrun/nr-program-options.service';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NrProgram, NrProgramOption, NetRunProgram } from './../../shared/models/netrun';

@Component({
  selector: 'cs-program-new',
  templateUrl: './program-new.component.html',
  styleUrls: ['./program-new.component.css']
})
export class ProgramNewComponent implements OnInit {
  faPlus = faPlus;
  faSave = faSave;
  classes: Array<NrProgramOption> = new Array<NrProgramOption>();
  options: Array<NrProgramOption> = new Array<NrProgramOption>();
  modalRef: BsModalRef;

  isSaved = true;

  @Input()
  program: NetRunProgram = new NetRunProgram();

  @Output()
  updateProgram: EventEmitter<NetRunProgram> = new EventEmitter<NetRunProgram>();

  constructor(private programData: NrProgramOptionsService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    const classesData =  this.programData.classes;
    const optionData = this.programData.options;
    forkJoin([classesData, optionData])
    .subscribe( data => {
      this.classes = data[0];
      this.options = data[1];
    });
  }

  updated() {
    this.isSaved = false;
    console.log('unsaved');
  }

  get optionList(): string {
    return this.program.options.map(o => o.name).join(' ');
  }

  save() {
    this.updateProgram.emit(this.program);
    this.isSaved = true;
  }

  isChecked(optName: string) {
    return this.program.options.some( (opt: NrProgramOption) => opt.name === optName);
  }

  checkOption(index: number) {
    const option = this.options[index];
    if (this.isChecked(option.name)) {
      const i = this.program.options.findIndex(opt => opt.name === option.name);
      this.program.description = this.program.description.replace(option.description, ' ');
      this.program.options.splice(i, 1);
    } else {
      this.program.options.push(option);
      this.program.description = `${this.program.description}${option.description} `;
    }
  }

  showOptions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  compare(a: NrProgramOption, b: NrProgramOption) {
    return a  && b ? a.name === b.name : a === b;
  }
}
