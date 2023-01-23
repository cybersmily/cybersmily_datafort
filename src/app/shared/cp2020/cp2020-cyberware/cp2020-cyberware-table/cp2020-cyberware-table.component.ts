import { DndDropEvent } from 'ngx-drag-drop';
import { FileLoaderService } from './../../../services/file-services/file-loader/file-loader.service';
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
    class: 'modal-lg modal-right  modal-dialog-scrollable',
  };

  selectedCyberware: Cp2020PlayerCyber = new Cp2020PlayerCyber();
  selectedIndex: number;
  canRollMore = true;
  isShopping = false;
  newLocation = '';
  selectLocation = '';
  expandLocation = new Array<string>();

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

  get isAddableLocation(): boolean {
    return !(
      this.newLocation !== '' && !this.locations.includes(this.newLocation.toLowerCase())
    );
  }

  get locations(): Array<string> {
    return this.currCyberList?.locations && this.currCyberList.locations.length > 0
      ? this.currCyberList.locations
      : [];
  }

  constructor(
    private modalService: BsModalService,
    private cyberGenerator: Cp2020CyberwareGeneratorService,
    private cyberData: CyberDataService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(): void {
    this.initialize();
  }

  initialize(): void {
    this.currCyberList =  new Cp2020PlayerCyberList(this.cyberList);
  }

  getCyberList(location: string): Array<Cp2020PlayerCyber> {
    return this.currCyberList.items.filter(cyber => cyber?.location === location);
  }

  updateList() {
    this.sortList();
    this.changeList.emit(this.currCyberList);
  }

  deleteFromModal(id: string) {
    this.delete(id);
    this.modalRef.hide();
  }

  delete(id: string) {
    const index = this.currCyberList.items.findIndex(cyber => cyber.id === id);
    this.currCyberList.items.splice(index, 1);
    this.updateList();
  }

  update(cyber: Cp2020PlayerCyber ) {
    const index = this.currCyberList.items.findIndex(cyb => cyb.id === cyber.id);
    this.currCyberList.items[index] = cyber;
    this.updateList();
    this.closeModal();
  }

  editCyberware(
    cyber: Cp2020PlayerCyber,
    template: TemplateRef<any>
  ) {
     const index = this.currCyberList.items.findIndex(itm => itm.id === cyber.id);
    this.selectedCyberware = this.currCyberList.items[index];
    this.openModal(template);
  }

  getColumn(list: Array<Cp2020PlayerCyber>, isTwoColumn: boolean): Array<Cp2020PlayerCyber> {
    if (isTwoColumn) {
      return list.slice(
        0,
        Math.ceil(list.length / 2)
      );
    }
    return list;
  }

  getColumnTwo(list: Array<Cp2020PlayerCyber>): Array<Cp2020PlayerCyber> {
    return list.slice(
      Math.ceil(list.length / 2)
    );
  }

  add(cyber: Cp2020PlayerCyber) {
    cyber.location = this.selectLocation;
    this.currCyberList.items.push(cyber);
    this.updateList();
  }

  generateCyberware() {
    this.cyberData.cp2020CyberwareList.subscribe((list) => {
      this.cyberGenerator.generateCyberList(1, list, this.currCyberList.items).subscribe((data) => {
        this.currCyberList.items = [...data.results];
        this.canRollMore = !data.noMore;
        this.updateList();
      });
    });
  }

  addLocation(): void {
    this.currCyberList.locations.push(this.newLocation.toLowerCase());
    this.expandLocation.push(this.newLocation.toLowerCase());
    this.newLocation = '';
    this.updateList();
  }

  removeLocation(location: string): void {
    const locat = location.toLowerCase();
    const index = this.currCyberList.locations.findIndex((loc) => loc === locat);
    if (index > -1) {
      this.currCyberList.locations.splice(index,1);
      this.currCyberList.items = this.currCyberList.items.map((gear) => {
        if (gear.location === locat) {
          gear.location = '';
        }
        return gear;
      });
      this.updateList();
    }
  }

  isLocationExpanded(loc: string): boolean {
    return this.expandLocation.includes(loc);
  }

  toggleLocation(loc: string): void {
    const index = this.expandLocation.indexOf(loc);
    if (index > -1) {
      this.expandLocation.splice(index, 1);
    } else {
      this.expandLocation.push(loc);
    }
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

  openModal(template: TemplateRef<any>, returnFocus?: string, isShopping?: boolean, location?: string) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
    this.isShopping = isShopping;
    this.selectLocation = location;
    if (returnFocus) {
      this.modalRef.onHidden.subscribe(() => {
        this.isShopping = false;
        this.selectLocation = '';
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
    this.isShopping = false;
    this.modalRef.hide();
  }


  onDrop(event: DndDropEvent, location: string): void {
    if (event.data.type === 'cyber') {
      const index = this.currCyberList.items.findIndex(
        (cyber) => cyber.id === event.data.cyber.id
      );
      if (index > -1) {
        this.currCyberList.items[index].location = location;
        this.updateList();
      }
    }
  }
}
