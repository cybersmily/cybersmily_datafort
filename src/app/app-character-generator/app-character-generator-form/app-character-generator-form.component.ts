import { Cp2020CyberwarePdfService } from './../../shared/cp2020/cp2020-cyberware/services/cp2020-cyberware-pdf/cp2020-cyberware-pdf.service';
import { Cp2020GearPdfService } from './../../shared/cp2020/cp2020-gear/services/cp2020-gear-pdf/cp2020-gear-pdf.service';
import { Cp2020WeaponSectionPdfService } from './../../shared/cp2020/cp2020weapons/services/cp2020-weapon-section-pdf/cp2020-weapon-section-pdf.service';
import { Cp2020ContactSectionPdfService } from './../../shared/cp2020/cp2020-contacts/services/cp2020-contact-section-pdf/cp2020-contact-section-pdf.service';
import { Observable, first, Subject } from 'rxjs';
import { Cp2020DeckmanagerPdfSectionService } from './../../shared/cp2020/cp2020-netrun-gear/services/cp2020-deckmanager-pdf-section/cp2020-deckmanager-pdf-section.service';
import { Cp2020ArmorPDFSectionService } from './../../shared/cp2020/cp2020-armor/services/cp2020-armor-pdf-section/cp2020-armor-pdf-section.service';
import { TitleValue } from './../../shared/models/title-value';
import { Cp2020CharGenSettings } from './../../shared/cp2020/models/cp2020-char-gen-settings';
import { SeoService } from './../../shared/services/seo/seo.service';
import {
  FileLoaderService,
  SaveFileService,
} from './../../shared/services/file-services';
import {
  faUpload,
  faFilePdf,
  faSave,
  faUndo,
  faQuestionCircle,
  faCog,
  faIdBadge,
  faCloudArrowUp,
  faCloudArrowDown,
  faLink,
  faCheck,
  faCopy,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { GoogleDriveService } from './../../shared/services/google-drive/google-drive.service';
import { Cp2020PlayerCharacter } from './../../shared/models/cp2020character/cp2020-player-character';
import { Cp2020CharacterGeneratorService } from './../../shared/services/chargen/cp2020-character-generator.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { Cp2020characterToPDF } from './../../shared/models/pdf/cp2020characterToPDF';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020StatsSectionPdfService } from './../../shared/cp2020/cp2020-stats/services/cp2020-stats-section-pdf/cp2020-stats-section-pdf.service';
import { Cp2020SkillSectionPdService } from './../../shared/cp2020/cp2020-skills/services/cp2020-skill-section-pdf/cp2020-skill-section-pd.service';
import { Cp2020CharacterToFandDPDF } from './../../shared/models/pdf/cp2020-character-to-fand-d-pdf';
import { SourcesDataService } from './../../shared/cp2020/cp2020-lifepath/services';

@Component({
    selector: 'cs-app-character-generator-form',
    templateUrl: './app-character-generator-form.component.html',
    styleUrls: ['./app-character-generator-form.component.css'],
    standalone: false
})
export class AppCharacterGeneratorFormComponent implements OnInit {
  faUpload = faUpload;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faQuestionCircle = faQuestionCircle;
  faCog = faCog;
  faIdBadge = faIdBadge;
  faCloudArrowUp = faCloudArrowUp;
  faCloudArrowDown = faCloudArrowDown;
  faLink = faLink;
  faCheck = faCheck;
  faCopy = faCopy;
  faLock = faLock;
  linkCopied = false;
  driveReadOnly = false;

  sources = new Array<TitleValue>();
  charGenSettings: Cp2020CharGenSettings = new Cp2020CharGenSettings();
  charGenSettingsKey: string = 'CP2020_CharGenSettings';
  driveFileIdKey: string = 'CP2020_CHAR_GEN_DRIVE_FILE_ID';
  driveFileId: string | null = null;
  driveBusy = false;
  baseRef: number = 0;
  baseInt: number = 0;
  notes: string = '';

  isNotesCollapsed = false;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  focusElem: ElementRef;

  @ViewChild('pdfCP2020Character', { static: false })
  pdfCP2020Character: ElementRef;

  @ViewChild('charGenSettingElem', { static: false })
  settingsElem: ElementRef;

  @ViewChild('charGenInstructions', { static: false })
  instructionElem: ElementRef;

  notesSubject: Subject<string> = new Subject();

  constructor(
    private characterService: Cp2020CharacterGeneratorService,
    private saveFileService: SaveFileService,
    private fileLoader: FileLoaderService,
    private modalService: BsModalService,
    private statPDFService: Cp2020StatsSectionPdfService,
    private skillPDFService: Cp2020SkillSectionPdService,
    private armorPDFService: Cp2020ArmorPDFSectionService,
    private weaponPDFService: Cp2020WeaponSectionPdfService,
    private gearPdfService: Cp2020GearPdfService,
    private cyberPdfService: Cp2020CyberwarePdfService,
    private deckmanagerPDFService: Cp2020DeckmanagerPdfSectionService,
    private contactPDFService: Cp2020ContactSectionPdfService,
    private seo: SeoService,
    private sourceService: SourcesDataService,
    private driveService: GoogleDriveService,
    private route: ActivatedRoute
  ) {}

  get isDriveConfigured(): boolean {
    return this.driveService.isConfigured();
  }

  ngOnInit() {
    this.seo.updateMeta(
      'Character Generator for Cyberpunk 2020',
      "2021-11-21 Cybersmily's Datafort Character Generator for Cyberpunk 2020. This app can print to PDF and save/load the character sheet"
    );
    this.loadSettings();
    this.driveFileId = window.localStorage.getItem(this.driveFileIdKey);

    this.route.queryParamMap.subscribe((params) => {
      const requestedDriveId = params.get('driveFileId');
      if (requestedDriveId && this.isDriveConfigured && requestedDriveId !== this.driveFileId) {
        this.loadDriveFile(requestedDriveId);
      }
    });
  }

  OnDestroy(): void {
    this.notesSubject.unsubscribe();
  }

  resetCharacter() {
    this.characterService.clearCharacter(this.charGenSettings.isIU);
    this.driveFileId = null;
    this.driveReadOnly = false;
    window.localStorage.removeItem(this.driveFileIdKey);
  }

  /**
   * Save the character json to a txt file.
   *
   * @memberof AppCharacterGeneratorFormComponent
   */
  saveCharacter() {
    this.characterService.character
      .pipe(first())
      .subscribe((character) => {
        this.saveFileService.SaveAsFile(
          'CP2020_' + character.handle.replace(' ', '_'),
          JSON.stringify(character)
        )}
      );
  }

  createPDF() {
    const characterToPDF = new Cp2020characterToPDF(
      this.statPDFService,
      this.skillPDFService,
      this.armorPDFService,
      this.weaponPDFService,
      this.gearPdfService,
      this.cyberPdfService,
      this.deckmanagerPDFService,
      this.contactPDFService
    );
    this.characterService.character
      .pipe(first())
      .subscribe((character) =>
        characterToPDF.generatePdf(character, this.charGenSettings)
      );
  }

  createFastDirtyPDF(): void {
    this.characterService.character
    .pipe(first())
    .subscribe( (character) => {
      const FandDPDF = new Cp2020CharacterToFandDPDF();
      FandDPDF.generateFastAndDirtyPlayerCharacerPdf(character);
    });
  }

  /**
   * load the character file to the page. Note, the handler needed
   * to be call from a separate function.
   *
   * @param {*} $event
   * @memberof AppCharacterGeneratorFormComponent
   */
  loadCharacter($event) {
    this.fileLoader
      .importJSON($event.target.files[0])
      .subscribe((data) => {
        this.characterService.changeCharacter(data);
        this.driveFileId = null;
        this.driveReadOnly = false;
        window.localStorage.removeItem(this.driveFileIdKey);
      });
  }

  async openFromDrive() {
    if (this.driveBusy) return;
    this.driveBusy = true;
    try {
      const picked = await this.driveService.pickFile();
      if (!picked) return;
      await this.applyDriveFile(picked.fileId);
    } catch (err: any) {
      console.error('Drive open failed', err);
      alert('Could not open from Google Drive:\n' + (err?.message || err));
    } finally {
      this.driveBusy = false;
    }
  }

  async loadDriveFile(fileId: string) {
    if (this.driveBusy) return;
    this.driveBusy = true;
    try {
      console.log('[drive] loading file', fileId);
      await this.applyDriveFile(fileId);
      console.log('[drive] load complete', fileId);
    } catch (err: any) {
      console.error('Drive deep-link load failed', err);
      alert('Could not load the requested Google Drive file:\n' + (err?.message || err));
    } finally {
      this.driveBusy = false;
    }
  }

  private async applyDriveFile(fileId: string) {
    const data = await this.driveService.loadFile(fileId);
    console.log('[drive] file content loaded', data);
    let meta: { canEdit: boolean } = { canEdit: true };
    try {
      meta = await this.driveService.getFileMeta(fileId);
      console.log('[drive] meta loaded', meta);
    } catch (err) {
      console.warn('[drive] meta fetch failed, defaulting to editable', err);
    }
    this.characterService.changeCharacter(data);
    this.driveFileId = fileId;
    this.driveReadOnly = !meta.canEdit;
    window.localStorage.setItem(this.driveFileIdKey, fileId);
  }

  get shareUrl(): string | null {
    if (!this.driveFileId) return null;
    return `${window.location.origin}/apps/chargen?driveFileId=${encodeURIComponent(this.driveFileId)}`;
  }

  async copyShareLink() {
    const url = this.shareUrl;
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      this.linkCopied = true;
      setTimeout(() => (this.linkCopied = false), 1500);
    } catch (err) {
      console.error('Clipboard write failed', err);
      window.prompt('Copy this share link:', url);
    }
  }

  saveToDrive() {
    this.doDriveSave(this.driveFileId, 'Could not save to Google Drive');
  }

  saveAsToDrive() {
    this.doDriveSave(null, 'Could not save a new copy to Google Drive');
  }

  private doDriveSave(targetFileId: string | null, errorPrefix: string) {
    if (this.driveBusy) return;
    this.characterService.character.pipe(first()).subscribe(async (character) => {
      let filename: string;
      if (!targetFileId) {
        const handle = (character.handle || 'character').replace(/\s+/g, '_');
        const suggested = `CP2020_${handle}.json`;
        const input = window.prompt('Save as (Drive filename):', suggested);
        if (input === null) return; // user cancelled
        filename = input.trim() || suggested;
        if (!/\.json$/i.test(filename)) filename += '.json';
      } else {
        filename = ''; // unused on update — existing name is preserved
      }
      this.driveBusy = true;
      try {
        const id = await this.driveService.saveFile(
          targetFileId,
          filename,
          JSON.stringify(character)
        );
        this.driveFileId = id;
        this.driveReadOnly = false;
        window.localStorage.setItem(this.driveFileIdKey, id);
      } catch (err: any) {
        console.error('Drive save failed', err);
        alert(errorPrefix + ':\n' + (err?.message || err));
      } finally {
        this.driveBusy = false;
      }
    });
  }

  loadSettings() {
    const settings: string = window.localStorage.getItem(
      this.charGenSettingsKey
    );
    this.charGenSettings = new Cp2020CharGenSettings(JSON.parse(settings));
    this.setSkillSettingStats();
    this.sourceService.getSources().subscribe((sources) => {
      this.sources = sources;
    });
  }

  saveSettings(settings: Cp2020CharGenSettings) {
    if (settings.isIU !== this.charGenSettings.isIU) {
      this.characterService.changeIU(settings.isIU);
    }
    this.charGenSettings = new Cp2020CharGenSettings(settings);
    this.setSkillSettingStats();
    window.localStorage.setItem(
      this.charGenSettingsKey,
      JSON.stringify(this.charGenSettings)
    );
  }

  setSkillSettingStats() {
    this.charGenSettings.skillSettings.ref = this.baseRef;
    this.charGenSettings.skillSettings.ref = this.baseInt;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(elemName?: string) {
    this.modalRef.hide();
    switch (elemName) {
      case 'settings':
        this.settingsElem.nativeElement.focus();
        break;
      case 'instructions':
        this.instructionElem.nativeElement.focus();
        break;
    }
  }
}
