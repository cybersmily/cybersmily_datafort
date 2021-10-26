import { ArmorGeneratorService } from './../services/armor-generator/armor-generator.service';
import { Cp2020ArmorAttributeLists } from './../models/armor-attribute-lists';
import { CP2020ArmorRandomSettings } from './../models/armor-random-settings';
import { ArmorDataAttributesService } from './../services/armor-data-attributes/armor-data-attributes.service';
import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020ArmorBlock } from './../models/cp2020-armor-block';
import { ArmorRandomGenSettingsService } from './../services/armor-random-gen-settings/armor-random-gen-settings.service';
import { Component, Input, Output, OnInit, TemplateRef, EventEmitter } from '@angular/core';
import { faDice, faPlus, faTrash, faChevronRight, faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'cs-cp2020-armor-section',
  templateUrl: './cp2020-armor-section.component.html',
  styleUrls: ['./cp2020-armor-section.component.css']
})
export class Cp2020ArmorSectionComponent implements OnInit {
  faDice = faDice;
  faCog = faCog;
  faPlus = faPlus;
  faTrash = faTrash;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  modalRef: BsModalRef;
  config: {};
  numberOfPieces = 1;

  settings = new CP2020ArmorRandomSettings();
  armorAttributes = new Cp2020ArmorAttributeLists();

  get collapseChevron():any {
    return (this.isCollapsed) ? this.faChevronRight : this.faChevronDown;
  }

  @Input()
  isCollapsed = false;

  @Input()
  armor = new Cp2020ArmorBlock();


  @Output()
  changeArmor = new EventEmitter<Cp2020ArmorBlock>();

  constructor(private randomSettingsService: ArmorRandomGenSettingsService,
    private modalService: BsModalService,
    private dice: DiceService,
    private armorAttributeService: ArmorDataAttributesService,
    private armorGeneratorService: ArmorGeneratorService
    ) { }

  ngOnInit(): void {
    this.randomSettingsService.settings.subscribe(settings => {
      this.settings = settings;
    });
    this.armorAttributeService.getData().subscribe( list => {
      this.armorAttributes = list;
    });
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  generate() {
    this.numberOfPieces = this.numberOfPieces < 1 ? 1 : this.numberOfPieces;
    this.armor.armorPieces = this.armorGeneratorService.generateArray(this.settings, this.dice, this.armorAttributes, this.numberOfPieces)
    this.modalRef?.hide();
  }
}
