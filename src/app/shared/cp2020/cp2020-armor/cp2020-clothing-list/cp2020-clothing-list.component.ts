import { ClothingListPdfService } from './../services/clothing-list-pdf/clothing-list-pdf.service';
import { ArmorRandomGenSettingsService } from './../services/armor-random-gen-settings/armor-random-gen-settings.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArmorDataAttributesService } from './../services/armor-data-attributes/armor-data-attributes.service';
import { DiceService } from './../../../services/dice/dice.service';
import { ArmorGeneratorService } from './../services/armor-generator/armor-generator.service';
import { faFilePdf, faRedo, faTrash, faDice } from '@fortawesome/free-solid-svg-icons';
import { ArmorListService } from './../services/armor-list/armor-list.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Cp2020ArmorPiece, Cp2020ArmorAttributeLists, CP2020ArmorRandomSettings } from '../models';

@Component({
    selector: 'cs-cp2020-clothing-list',
    templateUrl: './cp2020-clothing-list.component.html',
    styleUrls: ['./cp2020-clothing-list.component.css'],
    standalone: false
})
export class Cp2020ClothingListComponent implements OnInit {
  faFilePdf = faFilePdf;
  faRedo = faRedo;
  faTrash = faTrash;
  faDice = faDice;

  currList = new Array<Cp2020ArmorPiece>();
  numberOfPieces = 1;
  armorAttributes = new Cp2020ArmorAttributeLists();

  modalRef: BsModalRef;
  config = {class: 'modal-sm modal-dialog-centered',  keyboard: true};
  settings = new CP2020ArmorRandomSettings();

  get totalCost(): number {
    return this.currList?.reduce( (a, b) => a + b.cost, 0);
  }

  constructor(
    private armorListService: ArmorListService,
    private armorGeneratorService: ArmorGeneratorService,
    private dice: DiceService,
    private armorDataAttributesService: ArmorDataAttributesService,
    private modalService: BsModalService,
    private randomSettingService: ArmorRandomGenSettingsService,
    private clothingListPdfService: ClothingListPdfService
    ) {}

  ngOnInit() {
    this.armorListService.armorList.subscribe( list => {
      this.currList = list.map(armor => armor);
    });
    this.armorDataAttributesService.getData()
    .subscribe( data => {
      this.armorAttributes = new Cp2020ArmorAttributeLists(data);
    });
    this.randomSettingService.settings.subscribe( settings => {
      this.settings = settings;
    });
  }

  delete(index: number) {
    this.armorListService.remove(index);
  }

  clearArmorList() {
    this.armorListService.refresh();
    this.currList = new Array<Cp2020ArmorPiece>();
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  generate() {
    this.numberOfPieces = this.numberOfPieces < 1 ? 1 : this.numberOfPieces;
    this.armorListService
    .append(this.armorGeneratorService
      .generateArray(this.settings, this.dice, this.armorAttributes, this.numberOfPieces)
    );
    this.modalRef?.hide();
  }

  getOptionsString(armor: Cp2020ArmorPiece): string {
    const options = armor.options.map(opt => `${opt.name} (${opt?.effect})`).join(', ');
    return `${options}`;
  }

  savePdf() {
    this.clothingListPdfService.saveToPDF(this.currList, 'CP2020_ClothingList');
  }

}
