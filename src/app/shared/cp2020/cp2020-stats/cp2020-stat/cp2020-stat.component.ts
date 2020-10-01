import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Cp2020Stat, StatModifier } from './../../../models/cp2020character/cp2020-stat';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-stat',
  templateUrl: './cp2020-stat.component.html',
  styleUrls: ['./cp2020-stat.component.css']
})
export class Cp2020StatComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered'
  };


  @Input()
  stat: Cp2020Stat = new Cp2020Stat();

  @Input()
  statName = '';

  @Output()
  changeStat: EventEmitter<{statName: string, stat: Cp2020Stat}> = new EventEmitter<{statName: string, stat: Cp2020Stat}>();

  newStatModifier: StatModifier = {name: '', mod: 0};

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  get isWounded(): boolean {
    return (this.stat.WoundModifier < 0 || this.stat.Multiplier !== 1 );
  }

  onStatChange() {
    this.changeStat.emit({statName: this.statName, stat: this.stat});
  }

  addModifier() {
    if ( this.newStatModifier.name !== '') {
      this.stat.modifiers.push({name: this.newStatModifier.name, mod: this.newStatModifier.mod});
      this.onStatChange();
    }
  }

  deleteModifier(index: number) {
    this.stat.modifiers.splice(index, 1);
    this.onStatChange();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
