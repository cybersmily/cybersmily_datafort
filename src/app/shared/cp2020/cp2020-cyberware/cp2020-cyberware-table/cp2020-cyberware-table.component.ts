import { CyberDataService } from './../../../services/data/cyber-data.service';
import { Cp2020CyberwareGeneratorService } from './../services/cp2020-cyberware-generator.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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

  constructor(private modalService: BsModalService,
    private cyberGenerator: Cp2020CyberwareGeneratorService,
    private cyberData: CyberDataService) { }

  ngOnInit(): void {
  }

  updateList() {
    this.sortList();
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
    // remove blank entries
    if (this.cyberList.items.some(c => c.name === '')) {
      for (let i = 0; i < cyberArray.length; i++ ) {
        const index = this.cyberList.items.findIndex( c => c.name === '');
        if ( index > -1) {
          this.cyberList.items.splice(index, 1);
        }
      }
    }
    this.cyberList.items = this.cyberList.items.concat(cyberArray);
    this.updateList();
  }

  generateCyberware() {
    this.cyberData.cp2020CyberwareList.subscribe( list => {
      this.cyberGenerator.generateCyberList(1, list).subscribe( data => {
        this.add(data);
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  closeModal() {
    this.modalRef.hide();
  }

  sortList() {
    // very weird behavior when an entry is blank. so did the below to have all the
    // ones with a name to be at top and the other on the bottom.
    const namedCyber = this.cyberList.items.filter( c => c.name !== '');
    const blankCyber = this.cyberList.items.filter( c => c.name === '');
    namedCyber.sort( (a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.cyberList.items = namedCyber.concat(blankCyber);
  }

}
