import { JsonDataFiles } from '../../../services/file-services/json-data-files';
import { DataService } from '../../../services/file-services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faDiceSix, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { NrProgramOptionsService } from '../../../services/netrun/nr-program-options.service';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NrProgram, NrProgramOption, NetRunProgram } from '../models';

@Component({
  selector: 'cs-program-new',
  templateUrl: './program-new.component.html',
  styleUrls: ['./program-new.component.css']
})
export class ProgramNewComponent implements OnInit {
  faPlus = faPlus;
  faSave = faSave;
  faSearch = faSearch;
  classes: Array<NrProgramOption> = new Array<NrProgramOption>();
  options: Array<NrProgramOption> = new Array<NrProgramOption>();
  programList: Array<any> = new Array<any>();
  modalRef: BsModalRef;
  modalConfig: {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };
  searchTerm: string = '';

  isSaved = true;

  @Input()
  program: NetRunProgram = new NetRunProgram();

  @Output()
  updateProgram: EventEmitter<NetRunProgram> = new EventEmitter<NetRunProgram>();

  constructor(private programData: NrProgramOptionsService,
    private modalService: BsModalService,
    private dataService: DataService) { }

  ngOnInit(): void {
    const classesData =  this.programData.classes;
    const optionData = this.programData.options;
    const progList = this.dataService.GetJson(JsonDataFiles.CP2020_DECKS_PROGRAMS_JSON);
    forkJoin([classesData, optionData, progList])
    .subscribe( data => {
      this.classes = data[0];
      this.options = data[1];
      this.programList = data[2].programs
      .sort((a, b) => (a.class > b.class) ? 1 : (a.class === b.class) ? ((a.name > b.name) ? 1 : -1) : -1 );
    });
  }

  updated() {
    this.isSaved = false;
    this.program = new NetRunProgram(this.program);
  }

  get optionList(): string {
    return this.program.options.map(o => o.name).join('; ');
  }

  save() {
    this.updateProgram.emit(this.program);
    this.isSaved = true;
  }

  isChecked(optName: string): boolean {
    return this.program.options.some( (opt: NrProgramOption) => opt.name === optName);
  }

  checkOption(index: number) {
    if (index > -1 && index < this.options.length) {
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
  }

  showOptions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  compare(a: NrProgramOption, b: NrProgramOption): boolean {
    return a  && b ? a.name === b.name : a === b;
  }

  addProgram(prog: any) {
    this.program = new NetRunProgram();
    this.program.name = prog.name;
    this.program.description = prog.description;
    this.program.strength = prog.str;
    const i = this.classes.findIndex( c => c.name.toLocaleLowerCase() === prog.class.toLocaleLowerCase());
    if(i > -1 ) {
      this.program.class = this.classes[i];
    } else {
      this.program.class = {name: prog.class, description: '', diff: 10};
    }
    if(Array.isArray(prog.options)) {
      prog.options.forEach(opt => {
        const index = this.options.findIndex(o => o.name.toLocaleLowerCase() === opt.toLocaleLowerCase());
        if (index > -1) {
          const option = this.options[index];
          this.program.options.push({name: option.name, description: option.description, diff: option.diff});
        }
      });
    }
    this.program.bookCost = prog.cost;
    this.program.bookMu = prog.mu;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
