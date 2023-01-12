import { CyberDataService } from './../services';
import { Cp2020PlayerCyber, Cp2020Surgery, Cp2020Surgeries } from './../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DiceService } from './../../../services/dice/dice.service';
import {
  faDice,
  faSave,
  faTrash,
  faPlus,
  faSortAlphaUp,
  faSortAlphaDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberware-editor',
  templateUrl: './cp2020-cyberware-editor.component.html',
  styleUrls: ['./cp2020-cyberware-editor.component.css'],
})
export class Cp2020CyberwareEditorComponent implements OnInit, AfterViewInit {
  faDice = faDice;
  faSave = faSave;
  faTrash = faTrash;
  faPlus = faPlus;
  faSortAlphaUp = faSortAlphaUp;
  faSortAlphaDown = faSortAlphaDown;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  optionList: Array<Cp2020PlayerCyber> = new Array<Cp2020PlayerCyber>();
  cyberwareList: Array<Cp2020PlayerCyber> = new Array<Cp2020PlayerCyber>();
  newCyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();
  newOption: Cp2020PlayerCyber = new Cp2020PlayerCyber();

  @Input()
  cyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();

  @Input()
  index: number;

  @Output()
  changeCybeware: EventEmitter<{ index: number; cyber: Cp2020PlayerCyber }> =
    new EventEmitter<{ index: number; cyber: Cp2020PlayerCyber }>();

  @Output()
  deleteCyberware: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editCyberNameElem', { static: false })
  cyberNameTitleElem: ElementRef;

  constructor(
    private cyberDataService: CyberDataService,
    private diceService: DiceService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.newCyberware = new Cp2020PlayerCyber(this.cyberware);
    this.cyberDataService
      .getCP2020CyberwareOptions(this.newCyberware.type)
      .subscribe((options) => (this.optionList = options));
    this.cyberDataService.cp2020CyberwareList.subscribe((data) => {
      this.cyberwareList = data;
    });
  }

  ngAfterViewInit(): void {
    this.cyberNameTitleElem.nativeElement.focus();
  }

  changeType() {
    this.cyberDataService
      .getCP2020CyberwareOptions(this.newCyberware.type)
      .subscribe((options) => (this.optionList = options));
  }

  update() {
    this.changeCybeware.emit({ index: this.index, cyber: this.newCyberware });
  }

  isOption(name: string): boolean {
    return (
      this.newCyberware.options &&
      this.newCyberware.options.some(
        (opt: Cp2020PlayerCyber) =>
          opt.name.toLowerCase() === name.toLowerCase()
      )
    );
  }

  addOption(index: number) {
    const option = this.optionList[index];
    if (!this.newCyberware.options) {
      this.newCyberware.options = new Array<Cp2020PlayerCyber>();
      this.newCyberware.options.push(new Cp2020PlayerCyber(option));
      return;
    }
    const found = this.newCyberware.options.findIndex(
      (opt) => opt.name.toLowerCase() === option.name.toLowerCase()
    );
    if (found > -1) {
      this.newCyberware.options.splice(found, 1);
    } else {
      this.newCyberware.options.push(new Cp2020PlayerCyber(option));
    }
  }

  rollHL(die: string) {
    this.newCyberware.hl = this.diceService.rollMoreDice(die).total;
  }

  rollNewOptionHL(die: string, index: number) {
    this.newOption.hl = this.diceService.rollMoreDice(die).total;
  }

  rollOptionHL(die: string, index: number) {
    const roll: number = this.diceService.rollMoreDice(die).total;
    this.newCyberware.options[index].hl = roll;
  }

  get surgeries(): Array<Cp2020Surgery> {
    return Cp2020Surgeries.list;
  }

  changeHC() {
    if (!isNaN(Number(this.newCyberware.hc))) {
      this.newCyberware.hl = Number(this.newCyberware.hc);
    }
  }

  changeOptionHC() {
    if (!isNaN(Number(this.newOption.hc))) {
      this.newOption.hl = Number(this.newOption.hc);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.newOption = new Cp2020PlayerCyber();
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  saveNewOption() {
    this.newOption.type = this.cyberware.type;
    this.newOption.subtype = this.cyberware.subtype;
    if (typeof this.newCyberware.options === 'undefined') {
      this.newCyberware.options = new Array<Cp2020PlayerCyber>();
    }
    this.newCyberware.options.push(this.newOption);
    this.newCyberware.options = this.newCyberware.options.slice();
    this.closeModal();
  }

  addNewOption(item: Cp2020PlayerCyber) {
    if (this.newCyberware.options) {
      const found = this.newCyberware.options.findIndex(
        (opt) => opt.name.toLowerCase() === item.name.toLowerCase()
      );
      if (found < 0) {
        this.newCyberware.options.push(new Cp2020PlayerCyber(item));
        this.newCyberware.options = this.newCyberware.options.slice();
      }
    }
  }

  removeNewOption(index: number) {
    if (this.newCyberware.options) {
      this.newCyberware.options.splice(index, 1);
      this.newCyberware.options = this.newCyberware.options.slice();
    }
  }

  sortOptions(ascending: boolean) {
    if (ascending) {
      this.optionList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.optionList.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.optionList = this.optionList.slice();
  }

  closeModal() {
    this.modalRef.hide();
  }

  delete() {
    this.deleteCyberware.emit(this.newCyberware.id);
  }

  setDetails(): void {
    const index = this.cyberwareList.findIndex(
      (wpn) => wpn.name === this.newCyberware.name
    );
    if (index > -1) {
      this.newCyberware = new Cp2020PlayerCyber(this.cyberwareList[index]);
    }
  }
}
