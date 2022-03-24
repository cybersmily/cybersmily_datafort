import { CacheKeys } from './../../shared/cache-keys';
import { LocalStorageManagerService } from './../../shared/services/local-storage-manager/local-storage-manager.service';
import { Observable, take } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileLoaderService, SaveFileService } from './../../shared/services/file-services';
import { CPRedNetArchNode, CPRedIconTypeSettings } from './../models';
import { faFilePdf, faSave, faDice, faUpload, faQuestion, faSkullCrossbones, faLock, faCogs, faFile, faQuestionCircle, faImage, faCog, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CPRedNetArchService } from './../service/c-p-red-net-arch.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';

const SVG_ELEMENT_ID = '#cs-cpred-archdiagram';
@Component({
  selector: 'cs-net-arch-main',
  templateUrl: './net-arch-main.component.html',
  styleUrls: ['./net-arch-main.component.css']
})
export class NetArchMainComponent implements OnInit {

  faFilePdf = faFilePdf;
  faSave = faSave;
  faDice = faDice;
  faUpload = faUpload;
  faQuestionCircle = faQuestionCircle;
  faImage = faImage;
  faCog = faCog;
  faFileImage = faFileImage;

  @ViewChild('diagramSVG')
  private svgRef: ElementRef<HTMLElement>;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  architecture$: Observable<CPRedNetArchNode>;
  architectArray$: Observable<Array<Array<CPRedNetArchNode>>>;
  archSettings: CPRedIconTypeSettings = new CPRedIconTypeSettings();

  svg: string;
  randomFloors = true;
  randomFloorNumber = 10;
  randomDifficulty = true;
  difficulty: number = 0;

  getDifficulty(id: number): string {
    switch(id){
      case 1:
        return 'Standard';
      case 2:
        return 'Uncommon';
      case 3:
        return 'Advanced';
      default:
        return 'Basic';
    }
  }

  constructor(private dice: DiceService,
    private netArchService:CPRedNetArchService,
    private saveFile: SaveFileService,
    private fileLoader: FileLoaderService,
    private modalService: BsModalService,
    private localStoreService: LocalStorageManagerService,
    private seo: SeoService
    ) { }


  get defaultDV(): number {
    switch(this.netArchService.difficulty) {
      case 0:
        return 6;
      case 1:
        return 8;
      case 2:
        return 10;
      default:
        return 12;
    }
  }

  ngOnInit(): void {
    this.seo.updateMeta(
      'NET Architect Generator for Cyberpunk RED',
      "2021-11-21 Cybersmily's Datafort NET Architect for Cyberpunk RED. This app can print PDFs, SVG, PNG, and save/load the NET Architect"
    );
    const settings = this.localStoreService.retrive<CPRedIconTypeSettings>(CacheKeys.CPRED_NET_ARCHITECT_SETTINGS) ?? new CPRedIconTypeSettings();
    console.log('store',typeof settings )
    this.archSettings.import(settings);
    this.architecture$ = this.netArchService.architect;
    this.architectArray$ = this.netArchService.architectAsArray;
  }

  generate(): void {
    this.updateSettings(this.archSettings);
    this.netArchService.difficulty = this.difficulty;
    this.netArchService.generateArch( this.archSettings.randomFloors, this.archSettings.randomDifficulty, this.randomFloorNumber);
  }

  getString(n: any): string {
    return JSON.stringify(n);
  }

  save() {
    this.saveFile.SaveAsFile('Net Architect', this.netArchService.getJSON(),'json');
  }

  saveSVG() {
    const output = this.svgRef.nativeElement.querySelector(SVG_ELEMENT_ID);
    this.saveFile.SaveAsFile('NetarchSVGDiagram', output.outerHTML,'svg');
  }

  savePNG() {
    const output = this.svgRef.nativeElement.querySelector(SVG_ELEMENT_ID);
    this.saveFile.SaveAsPng('NetarchPNGDiagram.png', output);
  }

  load($event) {
    this.fileLoader
    .importJSON($event.target.files[0])
    .pipe(take(1))
    .subscribe((data) => {
      this.netArchService.update(new CPRedNetArchNode(data));
    });
  }

  updateArch($event: CPRedNetArchNode) {
    this.netArchService.update($event);
  }

  updateSVG($event: string) {
    // set a fix width to the svg
    this.svg = $event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  updateSettings(settings: CPRedIconTypeSettings) {
    this.archSettings = settings;
    this.localStoreService.store(CacheKeys.CPRED_NET_ARCHITECT_SETTINGS, this.archSettings.export());
  }
}
