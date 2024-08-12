import { Cp2020PlayerCharacter } from './../../shared/models/cp2020character/cp2020-player-character';
import { CharacterImporterService } from './../../shared/services/charimporter/character-importer.service';
import { FileLoaderService, SaveFileService } from './../../shared/services/file-services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {  CmbtTrckOpponent } from '../../shared/models/cmbt-trck';
import { faDice, faPlus, faTrash, faSave, faUpload, faRedo, faFileImport,
  faFilePdf, faQuestionCircle, faCopy, faChevronDown, faChevronUp, faMinus,
  faEyeSlash, faHeartBroken, faHeart, faHeartbeat, faFirstAid, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { OpponentTrackerService } from './../services/opponent-tracker.service';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Cp2020CharacterToFandDPDF } from './../../shared/models/pdf/cp2020-character-to-fand-d-pdf';

@Component({
  selector: 'cs-cmbt-trck-form',
  templateUrl: './cmbt-trck-form.component.html',
  styleUrls: ['./cmbt-trck-form.component.css']
})
export class CmbtTrckFormComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faSave = faSave;
  faUpload = faUpload;
  faRedo = faRedo;
  faFileImport = faFileImport;
  faHelp = faQuestionCircle;
  faCopy = faCopy;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faEyeSlash = faEyeSlash;
  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faHeartbeat = faHeartbeat;
  faFirstAid = faFirstAid;
  faSkullCrossbones = faSkullCrossbones;
  faFilePdf = faFilePdf;


  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg'
  };

  /**
   * Functions:
   * add/remove opponents
   * drag/drop order
   * random iniative for opponents
  */
  opponents: CmbtTrckOpponent[] = new Array<CmbtTrckOpponent>();

  selectedOpponent = new CmbtTrckOpponent();
  showList = true;

  selectedIndex = 0;
  turn = 1;
  useModal = false;

  initiativeIndex = 0;
  currentInitiativeOpp = new CmbtTrckOpponent();

  @HostListener("window:resize", [])
  checkToUseModal() {
    if (window.innerWidth < 992) {
      this.useModal = true;
    } else {
      this.useModal = false;
    }
  }


  constructor(private opponentService: OpponentTrackerService,
    private saveFileService: SaveFileService,
    private modalService: BsModalService,
    private fileLoader: FileLoaderService,
    private characterImporter: CharacterImporterService) {}

  ngOnInit() {
    this.opponentService.opponents.subscribe( opps => {
      this.opponents = opps;
      if (this.opponents.length < 1) {
        this.selectedOpponent = new CmbtTrckOpponent();
        this.currentInitiativeOpp = new CmbtTrckOpponent();
      }
      if (this.selectedOpponent?.name === '') {
        this.selectedOpponent = this.opponents[0];
        this.currentInitiativeOpp = this.opponents[0];
      } else {
        this.selectedOpponent = this.opponents[this.selectedIndex];
        this.currentInitiativeOpp = this.opponents[this.initiativeIndex];
      }
    });
    if (window.innerWidth < 992) {
      this.useModal = true;
    } else {
      this.useModal = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  /**
   * Roll initiative for all the Opponents
   *
   * @memberof CmbtTrckFormComponent
   */
  rollInitiative(id?: number) {
    this.opponentService.rollInitiative(id);
  }


  /**
   * Add a new opponent to the tracker.
   *
   * @memberof CmbtTrckFormComponent
   */
  addOpponent() {
    const newOpp = new CmbtTrckOpponent({name: `Opp${this.opponents.length + 1}`});
    this.opponentService.addOpponent(newOpp);
    this.selectOpponent(this.opponents.length - 1 );
  }

  /**
   * Remove oppenent from the tracker
   *
   * @memberof CmbtTrckFormComponent
   */
  removeOpponent(index: number) {
    this.selectedIndex = 0;
    this.selectOpponent(0);
    this.opponentService.removeOpponent(index);
  }

  copyOpponent(index: number) {
    const opp = this.opponents[index];
    const newOpp = new CmbtTrckOpponent(opp);
    newOpp.name =  `${opp.name}_${this.opponents.length + 1}`;
    newOpp.stats.Damage = 0;
    newOpp.stats.isStunned = false;
    newOpp.stats.deathState = 0;
    this.opponentService.addOpponent(newOpp, true);
  }

  /**
   * Sort the iniative based on roll then REF
   *
   * @memberof CmbtTrckFormComponent
   */
  sortInitiative() {
    this.opponentService.sortInitiative();
  }

  selectOpponent(index: number, template?: TemplateRef<any>) {
    this.selectedIndex = index;
    this.selectedOpponent = null;
    this.selectedOpponent = this.opponents[index];
    if(this.useModal && template) {
      const sidePanelConfig = {
        class: 'modal-right modal-xl',
        animated: true,
      };
      this.modalRef = this.modalService.show(template, sidePanelConfig);
    }
  }

  selectInitiative(index: number) {
    this.initiativeIndex = index < 0 ? 0 : index;
    this.currentInitiativeOpp = null;
    this.currentInitiativeOpp = this.opponents[this.initiativeIndex];
  }

  cycle(next: boolean) {
    let index = this.initiativeIndex;
    if(next) {
      index++;
      if(index >= this.opponents.length ) {
        index = 0;
        this.turn++;
      }
    } else {
      index--;
      index = (index < 0 ) ? this.opponents.length - 1 : index;
    }
    this.initiativeIndex = index;
    this.currentInitiativeOpp = null;
    this.currentInitiativeOpp = this.opponents[this.initiativeIndex];
  }

  cycleTurn(advance: boolean) {
    if(advance) {
      this.turn++;
    } else if(this.turn > 1) {
      this.turn--;
    }
    this.selectedIndex = 0;
    this.selectedOpponent = null;
    this.selectedOpponent = this.opponents[this.selectedIndex];
  }

  changeInitiative() {
    this.opponentService.sortInitiative(this.opponents);
  }

  changeOpponent(value: CmbtTrckOpponent) {
    this.opponentService.changeOpponent(value);
  }

  clear() {
    if (confirm('This will clear all the combatant data and start a new. Are you sure you want to wipe out everything?')) {
      this.opponentService.clear();
      this.modalService.hide();
    }
  }

  save() {
    this.saveFileService.SaveAsFile('CombatTracker-Data', JSON.stringify(this.opponents), 'json');
  }

  load($event) {
    const file = $event.target.files[0];
    const name: string = file.name;
    if (name && name.endsWith('.json')) {
      this.selectedOpponent = new CmbtTrckOpponent();
      this.selectedIndex = 0;
      this.opponents = new Array<CmbtTrckOpponent>();
      this.fileLoader.importJSON(file).subscribe(data => {
        if ( Array.isArray(data)) {
          this.opponentService.importArray(data);
        } else {
          alert( 'Error while reading the file. The content was corrupted.');
        }
      });
    } else {
      alert('Please select a combat tracker .json file to load.');
    }
  }

  import($event) {
    const file = $event.target.files[0];
    const name: string = file.name;
    if (name && (name.endsWith('.json') || name.endsWith('.txt'))) {
      this.fileLoader.importJSON<Cp2020PlayerCharacter>(file).subscribe( data => {
        const opp = this.characterImporter.convertCP2020PCToCmbtTrckOpp(data);
        this.opponentService.addOpponent(opp);
      });

    }
  }

  createFastDirtyPDF(): void {
    const FandDPDF = new Cp2020CharacterToFandDPDF();
    FandDPDF.generateFastAndDirtyCombatTrackerOppPdf(this.opponents);
  }




}
