import { Cp2020ProgramDataService } from './../services/cp2020-program-data/cp2020-program-data.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPlus, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
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
import { ProgramOption, Cp2020Program, Program } from '../models';

@Component({
    selector: 'cs-program-new',
    templateUrl: './cp2020-program-new.component.html',
    styleUrls: ['./cp2020-program-new.component.css'],
    standalone: false
})
export class Cp2020ProgramNewComponent implements OnInit, AfterViewInit {
  faPlus = faPlus;
  faSave = faSave;
  faSearch = faSearch;
  programClasses$: Observable<Array<ProgramOption>>;
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
    private programData: Cp2020ProgramDataService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.programList$ = this.programData.cp2020Programs;
    this.programClasses$ = this.programData.cp2020ProgramClasses;
    this.programData.cp2020ProgramOptions.subscribe(data => {
      this.options = data;
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
