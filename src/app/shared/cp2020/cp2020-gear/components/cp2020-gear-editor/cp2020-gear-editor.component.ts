import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faTrash, faPen, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Cp2020Gear } from './../../models/cp2020-gear';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Cp2020PlayerGear } from './../../models/cp2020-player-gear';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Cp2020GearDataService } from './../../services/cp2020-gear-data/cp2020-gear-data.service';

@Component({
  selector: 'cs-cp2020-gear-editor',
  templateUrl: './cp2020-gear-editor.component.html',
  styleUrls: ['./cp2020-gear-editor.component.css']
})
export class Cp2020GearEditorComponent implements OnInit, OnChanges {
  faTrash = faTrash;
  faPen = faPen;
  faSave = faSave;
  faSearch = faSearch;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-xl',
  };


  @Input()
  gear: Cp2020PlayerGear = new Cp2020PlayerGear();

  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  update: EventEmitter<Cp2020PlayerGear> = new EventEmitter<Cp2020PlayerGear>();

  currGear: Cp2020PlayerGear = new Cp2020PlayerGear();
  gearDataList = new Array<Cp2020Gear>();
  isEditMode = false;

  constructor(private gearDataService: Cp2020GearDataService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.initialise();
  }

  ngOnChanges(): void {
    this.initialise();
  }

  initialise(): void {
    this.currGear = new Cp2020PlayerGear(this.gear);
    this.gearDataService.gearList.subscribe((data) => {
      this.gearDataList = [...data];
    });
  }

  onGearChange(): void {
    this.update.emit(this.currGear);
  }

  removeGear(): void {
    this.delete.emit(this.currGear.id);
  }

  saveGear(): void {
    this.onGearChange();
    this.isEditMode = false;
  }

  selectGear(): void {
    const item = this.gearDataList.find( itm => itm.name === this.currGear.gear);
    this.currGear = new Cp2020PlayerGear(item);
    this.onGearChange();
  }


  showModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(): void {
    this.modalRef?.hide();
  }
}
