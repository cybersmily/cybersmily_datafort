import { CP2020ArmorRandomSettings } from './../models/armor-random-settings';
import { Cp2020ArmorAttributeLists } from './../models/armor-attribute-lists';
import { ArmorDataAttributesService } from './../services/armor-data-attributes/armor-data-attributes.service';
import { ArmorRandomGenSettingsService } from './../services/armor-random-gen-settings/armor-random-gen-settings.service';
import { DiceService } from './../../../services/dice/dice.service';
import { ArmorGeneratorService } from './../services/armor-generator/armor-generator.service';
import { Cp2020ArmorPiece } from '../models/cp2020-armor-piece';
import {
  faWrench,
  faTrash,
  faPlus,
  faDice,
  faSave,
  faCog,
  faRedo,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020ArmorBlock } from '../models/cp2020-armor-block';
import {
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cs-cp2020-opponent-armor-list',
    templateUrl: './cp2020-opponent-armor-list.component.html',
    styleUrls: ['./cp2020-opponent-armor-list.component.css'],
    standalone: false
})
export class Cp2020OpponentArmorListComponent implements OnInit, OnChanges {
  faWrench = faWrench;
  faTrash = faTrash;
  faPlus = faPlus;
  faDice = faDice;
  faSave = faSave;
  faCog = faCog;
  faRedo = faRedo;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  modalRef: BsModalRef;
  config: {} = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  @Input()
  armorBlock = new Cp2020ArmorBlock();

  @Input()
  isCollapsed = true;

  @Output()
  updateArmor = new EventEmitter<Cp2020ArmorBlock>();

  currArmorBlock = new Cp2020ArmorBlock();
  selectedArmor = new Cp2020ArmorPiece();
  selectedIndex = -1;
  armorAttributes = new Cp2020ArmorAttributeLists();
  settings = new CP2020ArmorRandomSettings();

  constructor(
    private modalService: BsModalService,
    private armorGeneratorService: ArmorGeneratorService,
    private dice: DiceService,
    private randomSettings: ArmorRandomGenSettingsService,
    private armorDataAttributesService: ArmorDataAttributesService
  ) {}

  ngOnInit(): void {
    this.currArmorBlock = new Cp2020ArmorBlock(this.armorBlock);
    this.armorDataAttributesService.getData().subscribe((data) => {
      this.armorAttributes = new Cp2020ArmorAttributeLists(data);
    });
    this.randomSettings.settings.subscribe((settings) => {
      this.settings = settings;
    });
  }

  ngOnChanges(): void {
    this.currArmorBlock = new Cp2020ArmorBlock(this.armorBlock);
  }

  update() {
    this.updateArmor.emit(this.currArmorBlock);
  }

  repairArmor(armor: Cp2020ArmorPiece) {
    armor.locations = this.currArmorBlock.repairArmorAllLocations(
      armor.baseSP,
      armor.locations
    );
    this.update();
  }

  editArmor(index: number, template: TemplateRef<any>): void {
    this.selectedArmor = this.currArmorBlock.armorPieces[index];
    this.selectedIndex = index;
    this.showModal(template);
  }

  deleteArmor(index: number) {
    this.currArmorBlock.removePiece(index);
    this.update();
  }

  reset() {
    this.currArmorBlock = new Cp2020ArmorBlock();
    this.update();
  }

  toggleActiveArmor(event, index: number) {
    if (event.target.checked) {
      this.currArmorBlock.activatePiece(index);
    } else {
      this.currArmorBlock.deactivatePiece(index);
    }
    this.update();
  }

  rollrandom() {
    const randomArmor = this.armorGeneratorService.generate(
      this.settings,
      this.dice,
      this.armorAttributes
    );
    this.currArmorBlock.addPiece(randomArmor);
    this.update();
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeArmorDetailModal() {
    this.selectedArmor = new Cp2020ArmorPiece();
    this.selectedIndex = -1;
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  updateSelectedArmor(armor: Cp2020ArmorPiece) {
    this.selectedArmor = new Cp2020ArmorPiece(armor);
    this.saveNewArmor();
  }

  saveNewArmor() {
    if (this.selectedIndex < 0) {
      this.currArmorBlock.addPiece(new Cp2020ArmorPiece(this.selectedArmor));
    } else {
      this.currArmorBlock.updatePiece(
        new Cp2020ArmorPiece(this.selectedArmor),
        this.selectedIndex
      );
    }
    this.closeArmorDetailModal();
    this.update();
  }
}
