import { CyberDataService } from './../services';
import { Cp2020CyberwareGeneratorService } from './../services/cp2020-cyberware-generator.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  faDice,
  faPlus,
  faPen,
  faTrash,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerCyberList, Cp2020PlayerCyber } from './../models';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-cyberware-table',
  templateUrl: './cp2020-cyberware-table.component.html',
  styleUrls: ['./cp2020-cyberware-table.component.css'],
})
export class Cp2020CyberwareTableComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faPen = faPen;
  faTrash = faTrash;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  get collapseChevron(): any {
    return this.isCollapsed ? this.faChevronRight : this.faChevronDown;
  }

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-lg modal-right',
  };

  selectedCyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();
  selectedIndex: number;

  @Input()
  cyberList: Cp2020PlayerCyberList = new Cp2020PlayerCyberList();
  currCyberList: Cp2020PlayerCyberList = new Cp2020PlayerCyberList();

  @Input()
  showDice = true;

  @Input()
  showAdd = true;

  @Input()
  showTwoColumns = false;

  @Input()
  isCollapsed = false;

  @Output()
  changeList: EventEmitter<Cp2020PlayerCyberList> = new EventEmitter<Cp2020PlayerCyberList>();

  @ViewChild('newCyberElem', { static: false })
  newCyberButton: ElementRef;

  @ViewChildren('cyberNameElem')
  cyberNameElemList: QueryList<ElementRef>;

  constructor(
    private modalService: BsModalService,
    private cyberGenerator: Cp2020CyberwareGeneratorService,
    private cyberData: CyberDataService
  ) {}

  ngOnInit(): void {}

  initialize(): void {
    this.currCyberList =  new Cp2020PlayerCyberList(this.cyberList);
  }

  updateList() {
    this.sortList();
    this.changeList.emit(this.currCyberList);
  }

  deleteFromModal(index: number) {
    this.delete(index);
    this.modalRef.hide();
  }

  delete(index: number, isSecondColumn?: boolean) {
    if (isSecondColumn) {
      index = index + Math.ceil(this.currCyberList.items.length / 2);
    }
    this.currCyberList.items.splice(index, 1);
    this.updateList();
    if (this.cyberNameElemList.length > index) {
      this.cyberNameElemList?.toArray()[index]?.nativeElement.focus();
    } else {
    }
  }

  update(data: { index: number; cyber: Cp2020PlayerCyber }) {
    this.currCyberList.items[data.index] = data.cyber;
    this.updateList();
    this.closeModal();
  }

  editCyberware(
    index: number,
    template: TemplateRef<any>,
    isSecondColumn?: boolean
  ) {
    if (isSecondColumn) {
      index = index + Math.ceil(this.currCyberList.items.length / 2);
    }
    this.selectedIndex = index;
    this.selectedCyberware = this.currCyberList.items[index];
    this.openModal(template);
  }

  getColumn(isTwoColumn: boolean): Array<Cp2020PlayerCyber> {
    if (isTwoColumn) {
      return this.currCyberList.items.slice(
        0,
        Math.ceil(this.currCyberList.items.length / 2)
      );
    }
    return this.currCyberList.items;
  }

  getColumnTwo(): Array<Cp2020PlayerCyber> {
    return this.currCyberList.items.slice(
      Math.ceil(this.currCyberList.items.length / 2)
    );
  }

  add(cyberArray: Array<Cp2020PlayerCyber>) {
    // remove blank entries
    if (this.currCyberList.items.some((c) => c.name === '')) {
      for (let i = 0; i < cyberArray.length; i++) {
        const index = this.currCyberList.items.findIndex((c) => c.name === '');
        if (index > -1) {
          this.currCyberList.items.splice(index, 1);
        }
      }
    }
    this.currCyberList.items = this.currCyberList.items.concat(cyberArray);
    this.updateList();
  }

  generateCyberware() {
    this.cyberData.cp2020CyberwareList.subscribe((list) => {
      this.cyberGenerator.generateCyberList(1, list).subscribe((data) => {
        this.add(data);
      });
    });
  }

  addLocation(): void {
  }

  sortList() {
    // very weird behavior when an entry is blank. so did the below to have all the
    // ones with a name to be at top and the other on the bottom.
    const namedCyber = this.currCyberList.items.filter((c) => c.name !== '');
    const blankCyber = this.currCyberList.items.filter((c) => c.name === '');
    namedCyber.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
    this.currCyberList.items = namedCyber.concat(blankCyber);
  }

  openModal(template: TemplateRef<any>, returnFocus?: string) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
    if (returnFocus) {
      this.modalRef.onHidden.subscribe(() => {
        switch (returnFocus) {
          case 'edit':
            break;
          case 'new':
            this.newCyberButton.nativeElement.focus();
            break;
        }
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
  }
}
