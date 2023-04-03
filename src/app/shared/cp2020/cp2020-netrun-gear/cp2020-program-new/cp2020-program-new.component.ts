import { Cp2020ProgramsDataService } from './../services';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, Observable } from 'rxjs';
import { NrProgramOptionsService } from '../../../services/netrun/nr-program-options.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ProgramOption, Cp2020Program } from '../models';

@Component({
  selector: 'cs-program-new',
  templateUrl: './cp2020-program-new.component.html',
  styleUrls: ['./cp2020-program-new.component.css'],
})
export class Cp2020ProgramNewComponent implements OnInit, AfterViewInit {
  faPlus = faPlus;
  faSave = faSave;
  faSearch = faSearch;
  classes: Array<ProgramOption> = new Array<ProgramOption>();
  options: Array<ProgramOption> = new Array<ProgramOption>();
  programList$: Observable<Array<Cp2020Program>>;
  modalRef: BsModalRef;
  modalConfig: {
    keyboard: true;
    class: 'modal-dialog-centered modal-lg';
  };
  searchTerm: string = '';

  isSaved = true;

  @Input()
  program: Cp2020Program = new Cp2020Program();

  @Output()
  updateProgram: EventEmitter<Cp2020Program> = new EventEmitter<Cp2020Program>();

  @ViewChild('programNameElem', { static: false })
  programNameInput: ElementRef;

  constructor(
    private programData: NrProgramOptionsService,
    private modalService: BsModalService,
    private programListData: Cp2020ProgramsDataService
  ) {}

  ngOnInit(): void {
    this.programList$ = this.programListData.programList;
    const classesData = this.programData.classes;
    const optionData = this.programData.options;
    forkJoin([classesData, optionData]).subscribe((data) => {
      this.classes = data[0];
      this.options = data[1];
    });
  }

  ngAfterViewInit(): void {
    this.programNameInput?.nativeElement.focus();
  }

  updated() {
    this.isSaved = false;
    this.program = new Cp2020Program(this.program);
  }

  get optionList(): string {
    return this.program.options.map((o) => o.name).join('; ');
  }

  save() {
    this.updateProgram.emit(this.program);
    this.isSaved = true;
  }

  isChecked(optName: string): boolean {
    return this.program.options.some(
      (opt: ProgramOption) => opt.name === optName
    );
  }

  checkOption(index: number) {
    if (index > -1 && index < this.options.length) {
      const option = this.options[index];
      if (this.isChecked(option.name)) {
        const i = this.program.options.findIndex(
          (opt) => opt.name === option.name
        );
        this.program.description = this.program.description.replace(
          option.description,
          ' '
        );
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
    return a && b ? a.name === b.name : a === b;
  }

  selectProgram(event: TypeaheadMatch): void {
    this.program = new Cp2020Program(event.item);
    const i = this.classes.findIndex(
      (c) => c.name?.toLowerCase() === event?.item?.class?.name.toLowerCase()
    );
    if (i > -1) {
      this.program.class = this.classes[i];
    } else {
      this.program.class = { name: event?.item?.class, description: '', diff: 10 };
    }
    this.program.options = this.getOptions(event?.item?.options);

  }

  addProgram(prog: any):void  {
    this.program = new Cp2020Program(prog);
    this.program.name = prog.name;
    this.program.description = prog.description;
    this.program.options = this.getOptions(prog.options);
    this.program.bookCost = prog.cost;
    this.program.bookMu = prog.mu;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  getOptions(options: Array<string>): Array<ProgramOption> {
    const newOptions = new Array<ProgramOption>();
    if (Array.isArray(options)) {
      options.forEach((opt) => {
        const index = this.options.findIndex(
          (o) => o.name.toLocaleLowerCase() === opt.toLocaleLowerCase()
        );
        if (index > -1) {
          const option = this.options[index];
          newOptions.push({
            name: option.name,
            description: option.description,
            diff: option.diff,
          });
        }
      });
    }
    return newOptions;
  }
}
