import { JsonDataFiles } from '../../../services/file-services/json-data-files';
import { DataService } from '../../../services/file-services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faDiceSix, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { NrProgramOptionsService } from '../../../services/netrun/nr-program-options.service';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Program, ProgramOption, Cp2020Program } from '../models';

@Component({
  selector: 'cs-program-new',
  templateUrl: './cp2020-program-new.component.html',
  styleUrls: ['./cp2020-program-new.component.css']
})
export class Cp2020ProgramNewComponent implements OnInit {
  faPlus = faPlus;
  faSave = faSave;
  faSearch = faSearch;
  classes: Array<ProgramOption> = new Array<ProgramOption>();
  options: Array<ProgramOption> = new Array<ProgramOption>();
  programList: Array<any> = new Array<any>();
  modalRef: BsModalRef;
  modalConfig: {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };
  searchTerm: string = '';

  isSaved = true;

  @Input()
  program: Cp2020Program = new Cp2020Program();

  @Output()
  updateProgram: EventEmitter<Cp2020Program> = new EventEmitter<Cp2020Program>();

  constructor(private programData: NrProgramOptionsService,
    private modalService: BsModalService,
    private dataService: DataService) { }

  ngOnInit(): void {
    const classesData =  this.programData.classes;
    const optionData = this.programData.options;
    const progList = this.dataService.GetJson(JsonDataFiles.CP2020_PROGRAM_LIST_JSON);
    forkJoin([classesData, optionData, progList])
    .subscribe( data => {
      this.classes = data[0];
      this.options = data[1];
      this.programList = data[2];
    });
  }

  updated() {
    this.isSaved = false;
    this.program = new Cp2020Program(this.program);
  }

  get optionList(): string {
    return this.program.options.map(o => o.name).join('; ');
  }

  save() {
    this.updateProgram.emit(this.program);
    this.isSaved = true;
  }

  isChecked(optName: string): boolean {
    return this.program.options.some( (opt: ProgramOption) => opt.name === optName);
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

  compare(a: ProgramOption, b: ProgramOption): boolean {
    return a  && b ? a.name === b.name : a === b;
  }

  addProgram(prog: any) {
    this.program = new Cp2020Program();
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
