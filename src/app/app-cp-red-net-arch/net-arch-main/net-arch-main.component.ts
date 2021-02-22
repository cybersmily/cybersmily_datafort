import { FileLoaderService } from './../../shared/services/file-loader/file-loader.service';
import { SaveFileService } from './../../shared/services/save-file.service';
import { CPRedNetArchNode } from './../models/net-arch-node';
import { faFilePdf, faSave, faDice, faUpload, faQuestion, faSkullCrossbones, faLock, faCogs, faFile } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { CPRedNetArchService } from './../service/c-p-red-net-arch.service';
import { AfterViewInit, Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CPRedNetArchPdf } from '../models/c-p-red-net-arch-pdf';

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
  faQuestion = faQuestion;

  arch: CPRedNetArchNode;
  archArray: Array<Array<CPRedNetArchNode>> = new Array<Array<CPRedNetArchNode>>();
  private floors: number = 3;
  netArchService: CPRedNetArchService = new CPRedNetArchService(this.dice);

  randomFloors = true;
  randomDifficulty = true;

  constructor(private dice: DiceService,
    private saveFile: SaveFileService,
    private fileLoader: FileLoaderService
    ) { }

  get numOfFloors(): number {
    return this.floors;
  }

  set numOfFloors(value: number) {
    this.floors = (value < 3) ? 3 : value;
  }

  ngOnInit(): void {
    this.netArchService.architect.subscribe( arch => {
      this.arch = undefined;
      this.arch = arch;
    });
    this.netArchService.numOfFloors.subscribe( floors => {
      this.numOfFloors = floors;
    });
    this.netArchService.architectAsArray.subscribe( arr => {
      this.archArray = arr;
    });
  }

  generate(): void {
    this.netArchService.generateArch( this.randomFloors, this.randomDifficulty, this.numOfFloors);
  }

  removeArch() {
    this.arch = undefined;
  }

  getString(n: any): string {
    return JSON.stringify(n);
  }

  save() {
    this.saveFile.SaveAsFile('Net Architect', JSON.stringify(this.arch),'json');
  }
  load($event) {
    this.fileLoader
    .importJSON($event.target.files[0])
    .subscribe((data) => this.arch = new CPRedNetArchNode(data));
  }

  updateArch($event: CPRedNetArchNode) {
    this.arch.update($event);
    this.netArchService.update(this.arch);
  }

}
