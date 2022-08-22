import {
  ArmorGeneratorService,
  ArmorDataAttributesService,
  ArmorRandomGenSettingsService,
} from './../services';
import { DiceService } from './../../../services/dice/dice.service';
import {
  Cp2020ArmorBlock,
  Cp2020ArmorPiece,
  Cp2020ArmorAttributeLists,
  CP2020ArmorRandomSettings,
} from './../models';
import {
  Component,
  Input,
  Output,
  OnInit,
  TemplateRef,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  faDice,
  faPlus,
  faTrash,
  faChevronRight,
  faChevronDown,
  faCog,
  faSave,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cp2020-armor-section',
  templateUrl: './cp2020-armor-section.component.html',
  styleUrls: ['./cp2020-armor-section.component.css'],
})
export class Cp2020ArmorSectionComponent implements OnInit {
  faDice = faDice;
  faCog = faCog;
  faPlus = faPlus;
  faTrash = faTrash;
  faSave = faSave;
  faWrench = faWrench;

  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  modalRef: BsModalRef;
  config: {
    keyboard: true;
    class: 'modal-dialog-centered modal-xl';
  };
  numberOfPieces = 1;

  settings = new CP2020ArmorRandomSettings();
  armorAttributes = new Cp2020ArmorAttributeLists();
  selectedArmor = new Cp2020ArmorPiece();
  selectedIndex = -1;

  get collapseChevron(): any {
    return this.isCollapsed ? this.faChevronRight : this.faChevronDown;
  }

  get columnOne(): Array<Cp2020ArmorPiece> {
    const len = Math.ceil(this.armorBlock.armorPieces.length / 2);
    return this.armorBlock.armorPieces.slice(0, len);
  }

  get columnTwo(): Array<Cp2020ArmorPiece> {
    const len = Math.ceil(this.armorBlock.armorPieces.length / 2);
    return this.armorBlock.armorPieces.slice(len);
  }

  @Input()
  isCollapsed = false;

  @Input()
  armorBlock = new Cp2020ArmorBlock();

  @Output()
  changeArmor = new EventEmitter<Cp2020ArmorBlock>();

  @ViewChild('armorTitleElem', { static: false })
  armorTitleHeader: ElementRef;

  @ViewChildren('armorNameElem')
  armorNameElemList: QueryList<ElementRef>;

  constructor(
    private randomSettingsService: ArmorRandomGenSettingsService,
    private modalService: BsModalService,
    private dice: DiceService,
    private armorAttributeService: ArmorDataAttributesService,
    private armorGeneratorService: ArmorGeneratorService
  ) {}

  ngOnInit(): void {
    this.randomSettingsService.settings.subscribe((settings) => {
      this.settings = settings;
    });
    this.armorAttributeService.getData().subscribe((list) => {
      this.armorAttributes = list;
    });
  }

  generate() {
    this.numberOfPieces = this.numberOfPieces < 1 ? 1 : this.numberOfPieces;
    this.armorBlock.armorPieces.push(
      ...this.armorGeneratorService.generateArray(
        this.settings,
        this.dice,
        this.armorAttributes,
        this.numberOfPieces
      )
    );
    this.update();
    this.modalRef?.hide();
  }

  activePiece(event, index: number) {
    if (event.target.checked) {
      this.armorBlock.activatePiece(index);
    } else {
      this.armorBlock.deactivatePiece(index);
    }
    this.update();
  }

  saveArmor() {
    if (this.selectedIndex > -1) {
      // is an edit
      this.armorBlock.updatePiece(this.selectedArmor, this.selectedIndex);
    } else {
      // is a new item
      this.armorBlock.addPiece(this.selectedArmor);
    }
    this.update();
    this.closeArmorDetailModal();
  }

  deleteArmor(index: number) {
    this.armorBlock.removePiece(index);
    this.update();
    this.armorTitleHeader.nativeElement.focus();
  }

  repair(armor: Cp2020ArmorPiece) {
    armor.locations = this.armorBlock.repairArmorAllLocations(
      armor.baseSP,
      armor.locations
    );
    this.update();
  }

  selectIndex(index: number, template: TemplateRef<any>) {
    this.selectedIndex = index;
    this.selectedArmor = new Cp2020ArmorPiece(
      this.armorBlock.armorPieces[this.selectedIndex]
    );
    this.showModal(template, 'edit', index);
  }

  updateSelectedArmor(armor: Cp2020ArmorPiece) {
    // test the param to make sure it is armor and not a change event
    if (armor.clothes && armor.quality) {
      this.selectedArmor = new Cp2020ArmorPiece(armor);
    }
  }

  update() {
    this.changeArmor.emit(this.armorBlock);
  }

  updateSettings(settings: CP2020ArmorRandomSettings) {
    this.armorBlock.isLayerEVCalcEnabled = settings.isLayerCalculationEnabled;
    this.update();
  }

  showModal(template: TemplateRef<any>, returnFocus?: string, index?: number) {
    this.modalRef = this.modalService.show(template, this.config);
    if (returnFocus) {
      this.modalRef.onHidden.subscribe(() => {
        switch (returnFocus) {
          case 'new':
            this.armorNameElemList.last?.nativeElement.focus();
            break;
          case 'edit':
            this.armorNameElemList?.toArray()[index]?.nativeElement.focus();
            break;
        }
      });
    }
  }

  closeArmorDetailModal() {
    this.selectedArmor = new Cp2020ArmorPiece();
    this.selectedIndex = -1;
    this.modalRef.hide();
  }
}
