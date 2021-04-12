import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020Surgeries } from './../../../models/cyberware/cp2020-surgeries';
import { Cp2020Surgery } from './../../../models/cyberware/cp2020-surgery';
import { faDice, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CyberDataService } from './../../../services/data/cyber-data.service';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { Cp2020PlayerCyber } from './../../../models/cyberware';

@Component({
  selector: 'cs-cp2020-cyberware-editor',
  templateUrl: './cp2020-cyberware-editor.component.html',
  styleUrls: ['./cp2020-cyberware-editor.component.css']
})
export class Cp2020CyberwareEditorComponent implements OnInit {
  faDice = faDice;
  faSave = faSave;
  faTrash = faTrash;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  optionList: Array<Cp2020PlayerCyber> = new Array<Cp2020PlayerCyber>();
  newCyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();
  newOption:  Cp2020PlayerCyber = new Cp2020PlayerCyber();

  @Input()
  cyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();

  @Input()
  index: number;

  @Output()
  changeCybeware: EventEmitter<{index: number, cyber: Cp2020PlayerCyber}> = new EventEmitter<{index: number, cyber: Cp2020PlayerCyber}>();

  @Output()
  deleteCyberware: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cyberDataService: CyberDataService,
    private diceService: DiceService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.newCyberware = new Cp2020PlayerCyber(this.cyberware);
    this.cyberDataService
    .getCP2020CyberwareOptions(this.newCyberware.type)
    .subscribe( options => this.optionList = options);
  }

  changeType() {
    this.cyberDataService
    .getCP2020CyberwareOptions(this.newCyberware.type)
    .subscribe( options => this.optionList = options);
  }

  update() {
    this.changeCybeware.emit({index: this.index, cyber: this.newCyberware});
  }

  isOption(name: string): boolean {
    return this.newCyberware.options
    && this.newCyberware.options.some((opt: Cp2020PlayerCyber) => opt.name.toLowerCase() === name.toLowerCase());
  }

  addOption(index: number) {
    const option = this.optionList[index];
    if (!this.newCyberware.options) {
      this.newCyberware.options = new Array<Cp2020PlayerCyber>();
      this.newCyberware.options.push(new Cp2020PlayerCyber(option));
      return;
    }
    const found = this.newCyberware.options.findIndex( opt => opt.name.toLowerCase() === option.name.toLowerCase());
    if (found > -1) {
      this.newCyberware.options.splice(found, 1);
    } else {
      this.newCyberware.options.push(new Cp2020PlayerCyber(option));
    }
  }

  rollHL( die: string) {
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

  closeModal() {
    this.modalRef.hide();
  }

  delete() {
    this.deleteCyberware.emit(this.index);
  }
}
