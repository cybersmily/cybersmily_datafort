import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { faDice, faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerCyberList, Cp2020PlayerCyber } from './../../../models/cyberware';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberware-table',
  templateUrl: './cp2020-cyberware-table.component.html',
  styleUrls: ['./cp2020-cyberware-table.component.css']
})
export class Cp2020CyberwareTableComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  selectedCyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();
  selectedIndex: number;

  @Input()
  cyberList: Cp2020PlayerCyberList = new Cp2020PlayerCyberList();

  @Input()
  showDice = true;

  @Input()
  showAdd = true;

  @Output()
  changeList: EventEmitter<Cp2020PlayerCyberList> = new EventEmitter<Cp2020PlayerCyberList>();

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  updateList() {
    this.cyberList.items.sort( (a, b) => a.name > b.name ? 1 : -1);
    this.changeList.emit(this.cyberList);
  }

  delete(index: number) {
    this.cyberList.items.splice(index, 1);
    this.updateList();
  }

  update(data: {index: number, cyber: Cp2020PlayerCyber}) {
    this.cyberList.items[data.index] = data.cyber;
    this.updateList();
    this.closeModal();
  }

  editCyberware(index: number, template: TemplateRef<any>) {
    this.selectedIndex = index;
    this.selectedCyberware = this.cyberList.items[index];
    this.openModal(template);
  }

  add(cyberArray: Array<Cp2020PlayerCyber>) {
    this.cyberList.items = this.cyberList.items.concat(cyberArray);
    this.updateList();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

}
