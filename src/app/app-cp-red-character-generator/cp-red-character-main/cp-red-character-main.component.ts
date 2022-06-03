import { CpRedCharacter } from './../../shared/cpred/models/cp-red-character';
import { CPRedCharacterSheet } from './../../shared/cpred/models';
import { Observable } from 'rxjs';
import { CpRedCharacterManagerService } from './../../shared/cpred/cp-red-character/services/cp-red-character-manager/cp-red-character-manager.service';
import {
  SaveFileService,
  FileLoaderService,
} from './../../shared/services/file-services';
import { LocalStorageManagerService } from './../../shared/services/local-storage-manager/local-storage-manager.service';
import { SeoService } from './../../shared/services/seo/seo.service';
import {
  faFile,
  faFilePdf,
  faUpload,
  faUndo,
  faQuestionCircle,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-main',
  templateUrl: './cp-red-character-main.component.html',
  styleUrls: ['./cp-red-character-main.component.css'],
})
export class CpRedCharacterMainComponent implements OnInit {
  faFile = faFile;
  faFilePdf = faFilePdf;
  faUpload = faUpload;
  faUndo = faUndo;
  faQuestionCircle = faQuestionCircle;
  faCog = faCog;

  currSheet$: Observable<CPRedCharacterSheet> =
    new Observable<CPRedCharacterSheet>();
  STORAGE_KEY: string = 'cpr-character-generator';

  constructor(
    private seo: SeoService,
    private storageService: LocalStorageManagerService,
    private fileLoadService: FileLoaderService,
    private fileSaveService: SaveFileService,
    private characterManagerService: CpRedCharacterManagerService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.seo.updateMeta(
      'Character Generator for Cyberpunk Red',
      "2022-06, Cybersmily's Datafort Character Generator utility for Cyberpunk Red."
    );
    this.currSheet$ = this.characterManagerService.sheet;
    if (this.storageService.hasKey(this.STORAGE_KEY)) {
      this.characterManagerService.updateCharacter(
        this.storageService.retrive<CpRedCharacter>(this.STORAGE_KEY)
      );
    }
  }

  updateSheet(sheet: CPRedCharacterSheet): void {
    this.characterManagerService.updateCharacter(sheet.character);
    this.storageService.store(this.STORAGE_KEY, sheet.character);
  }

  save(): void {
    this.currSheet$
      .subscribe((sheet: CPRedCharacterSheet) => {
        const regex = /^0-9A-Za-z ,.!$&()-=@{}[]-/g;
        const filename =
          sheet.character.handle === ''
            ? 'cpred_character'
            : sheet.character.handle.replace(regex, '_');
        this.fileSaveService.SaveAsFile(filename, sheet.character, '.json');
      })
      .unsubscribe();
  }

  upload($event): void {
    this.fileLoadService
      .importJSON<CpRedCharacter>($event.target.files[0])
      .subscribe((data) => {
        this.updateSheet(new CPRedCharacterSheet(data));
      });
  }

  saveAsPdf(): void {}

  reset(): void {
    this.storageService.clear(this.STORAGE_KEY);
    this.characterManagerService.clear();
  }
}
