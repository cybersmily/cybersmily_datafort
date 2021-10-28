import { ArmorListService } from './../../shared/cp2020/cp2020-armor/services/armor-list/armor-list.service';
import { StorageKeys } from './../../shared/enums/storage-keys';
import { LocalStorageManagerService } from './../../shared/services/local-storage-manager/local-storage-manager.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CP2020ArmorRandomSettings } from './../../shared/cp2020/cp2020-armor/models/armor-random-settings';
import { SeoService } from './../../shared/services/seo/seo.service';
import { SaveFileService } from './../../shared/services/file-services';
import { Cp2020ArmorPiece } from '../../shared/cp2020/cp2020-armor/models';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { faFile, faSave, faFilePdf, faPlus, faRedo, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cs-fashion-generator',
  templateUrl: './fashion-generator.component.html',
  styleUrls: ['./fashion-generator.component.css']
})
export class FashionGeneratorComponent implements OnInit {
  faFile = faFile;
  faSave = faSave;
  faFilePdf = faFilePdf;
  faPlus = faPlus;
  faRedo = faRedo;
  faCog = faCog;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  armorList = Array<Cp2020ArmorPiece>();
  currArmor = new Cp2020ArmorPiece();
  settings = new CP2020ArmorRandomSettings();

  constructor(
    private modalService: BsModalService,
    private localStorageService: LocalStorageManagerService,
    private saveFileService: SaveFileService,
    private seo: SeoService,
    private armorListService: ArmorListService) {
  }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Fashion Calculator',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Fashion Calculator is an application to generate a character clothes using the Chromebook 3 supplement.'
    );
    this.settings = this.localStorageService.retrive(StorageKeys.ARMOR_GENERATOR_SETTINGS) ?? new CP2020ArmorRandomSettings();
  }

  updateArmor(event: Cp2020ArmorPiece) {
    if(event?.name !== '' && event?.clothes){
      this.currArmor = new Cp2020ArmorPiece(event);
    }
  }


  addArmor() {
    this.armorListService.add(this.currArmor);
  }

  updateSettings(settings: CP2020ArmorRandomSettings) {
    this.localStorageService.store(StorageKeys.ARMOR_GENERATOR_SETTINGS, this.settings);
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

}
