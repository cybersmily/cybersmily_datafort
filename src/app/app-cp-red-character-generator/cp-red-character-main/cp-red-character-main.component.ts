import { CpRedWoundsManagerService } from './../../shared/cpred/cp-red-wounds/services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { CpRedCharacterStats } from './../../shared/cpred/c-p-red-stats/models/cp-red-character-stats';
import { CpRedCharacterPdfService } from './../../shared/cpred/cp-red-character/services/cp-red-character-pdf/cp-red-character-pdf.service';
import { CpRedSkillManagerService } from './../../shared/cpred/cp-red-skills/services/cp-red-skill-manager/cp-red-skill-manager.service';
import { map } from 'rxjs/operators';
import { CpRedStatsManagerService } from './../../shared/cpred/c-p-red-stats/services/cp-red-stats-manager/cp-red-stats-manager.service';
import { CpRedCharacter } from './../../shared/cpred/models/cp-red-character';
import { CPRedCharacterSheet } from './../../shared/cpred/models';
import { Observable, Subscription, first } from 'rxjs';
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
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-main',
  templateUrl: './cp-red-character-main.component.html',
  styleUrls: ['./cp-red-character-main.component.css'],
})
export class CpRedCharacterMainComponent implements OnInit, OnDestroy {
  faFile = faFile;
  faFilePdf = faFilePdf;
  faUpload = faUpload;
  faUndo = faUndo;
  faQuestionCircle = faQuestionCircle;
  faCog = faCog;

  currSheet$: Observable<CPRedCharacterSheet> =
    new Observable<CPRedCharacterSheet>();
  STORAGE_KEY: string = 'cpr-character-generator';
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private seo: SeoService,
    private storageService: LocalStorageManagerService,
    private fileLoadService: FileLoaderService,
    private fileSaveService: SaveFileService,
    private characterManagerService: CpRedCharacterManagerService,
    private statManager: CpRedStatsManagerService,
    private skillManager: CpRedSkillManagerService,
    private woundsManager: CpRedWoundsManagerService,
    private characterPDFService: CpRedCharacterPdfService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  initialize(): void {
    this.seo.updateMeta(
      'Character Generator for Cyberpunk Red',
      "2022-06, Cybersmily's Datafort Character Generator utility for Cyberpunk Red."
    );
    this.currSheet$ = this.characterManagerService.sheet;
    const characterSheet = new CPRedCharacterSheet();
    if (this.storageService.hasKey(this.STORAGE_KEY)) {
      characterSheet.character = this.storageService.retrive<CpRedCharacter>(
        this.STORAGE_KEY
      );
    }
    this.initializeManagers(characterSheet.character);
    this.subscribeToManagers();
  }

  initializeManagers(character: CpRedCharacter) {
    this.characterManagerService.updateCharacter(character);
    this.woundsManager.initialize(character.wounds);
    this.statManager.initialize(character.stats);
    this.skillManager.initialize(character.skills);
  }

  subscribeToManagers(): void {
    this._subscriptions.add(
      this.characterManagerService.sheet.subscribe((sheet) => {
        console.log('sheet update', sheet);
        this.storageService.store(this.STORAGE_KEY, sheet.character);
      })
    );
    this._subscriptions.add(
      this.woundsManager.wounds.subscribe((wounds) => {
        console.log('wounds update', wounds);
        this.characterManagerService.updateWounds(wounds);
      })
    );
    this._subscriptions.add(
      this.statManager.characterStats.subscribe((stats) => {
        console.log('stats update', stats);
        this.characterManagerService.updateStats(stats);
      })
    );
    this._subscriptions.add(
      this.skillManager.skills.subscribe((skills) => {
        console.log('skills update', skills);
        this.characterManagerService.updateSkills(skills);
      })
    );
  }

  updateSheet(sheet: CPRedCharacterSheet): void {
    this.initializeManagers(sheet.character);
  }

  save(): void {
    this.currSheet$.pipe(first()).subscribe((sheet: CPRedCharacterSheet) => {
      const regex = /^0-9A-Za-z ,.!$&()-=@{}[]-/g;
      const filename =
        sheet.character.handle === ''
          ? 'cpred_character'
          : sheet.character.handle.replace(regex, '_');
      this.fileSaveService.SaveAsFile(filename, sheet.character, '.json');
    });
  }

  upload($event): void {
    this.fileLoadService
      .importJSON<CpRedCharacter>($event.target.files[0])
      .subscribe((data) => {
        this.updateSheet(new CPRedCharacterSheet(data));
      });
  }

  saveAsPdf(): void {
    this.characterManagerService.sheet.pipe(first()).subscribe((sheet) => {
      console.log('pdf sheet', sheet);
      this.characterPDFService.savePDF(sheet);
    });
  }

  reset(): void {
    this.storageService.clear(this.STORAGE_KEY);
    this.characterManagerService.clear();
    this.skillManager.loadSkills();
    this.statManager.clear();
  }
}
