import { Cp2020StatBlock } from './../../shared/models/cp2020character/cp2020-stat-block';
import { CharacterImporterService } from './../../shared/services/charimporter/character-importer.service';
import { FileLoaderService } from './../../shared/services/file-loader/file-loader.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SaveFileService } from './../../shared/services/save-file.service';
import { CmbtTrckOppSelection, CmbtTrckOpponent } from '../../shared/models/cmbt-trck';
import { faDice, faPlus, faTrash, faSave, faUpload, faRedo, faFileImport, faQuestionCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Cp2020_WOUND_LEVELS } from './../../shared/models/cp2020character';
import { OpponentTrackerService } from './../services/opponent-tracker.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trck-form',
  templateUrl: './cmbt-trck-form.component.html',
  styleUrls: ['./cmbt-trck-form.component.css']
})
export class CmbtTrckFormComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faTrash = faTrash;
  faSave = faSave;
  faUpload = faUpload;
  faRedo = faRedo;
  faFileImport = faFileImport;
  faHelp = faQuestionCircle;
  faCopy = faCopy;


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

  selectedIndex = 0;

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
      }
      if (this.selectedOpponent.name === '') {
        this.selectedOpponent = this.opponents[0];
      } else {
        this.selectedOpponent = this.opponents[this.selectedIndex];
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  /**
   * Roll initiative for all the Opponents
   *
   * @memberof CmbtTrckFormComponent
   */
  rollInitiative(index?: number) {
    this.opponentService.rollInitiative(index);
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
    newOpp.name =  `Opp${this.opponents.length + 1}`;
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

  selectOpponent(index: number) {
    this.selectedIndex = index;
    this.selectedOpponent = null;
    this.selectedOpponent = this.opponents[index];
  }

  changeInitiative() {
    this.opponentService.sortInitiative();
  }

  changeOpponent(value: CmbtTrckOpponent) {
    this.opponentService.changeOpponent(value);
  }

  getWoundLevel(opp): string {
    if (opp.stats.WoundLevel > 0)  {
      return Cp2020_WOUND_LEVELS[opp.stats.WoundLevel] + ' wound';
    }
    return '';
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
      this.fileLoader.importJSON(file).subscribe( data => {
        const opp = this.characterImporter.convertCP2020PCToCmbtTrckOpp(data);
        this.opponentService.addOpponent(opp);
      });

    }
  }

  showInitiativeMods(oppStats: Cp2020StatBlock, combatSense: number): string {
    let results = '';
    results = oppStats.initiativeModifiers.map( mod => `,${mod.name}: ${mod.mod > 0 ? '+' + mod.mod : mod.mod}`).join('');
    const cmbtSense = (combatSense > 0) ? `, Combat Sensse: +${combatSense}`  : '';
    results = `[REF: ${oppStats.REF.Adjusted}${cmbtSense}${results}]`;
    return results;
  }

  showInitiativeTooltip(opp: CmbtTrckOpponent): string {
    return `Initiative Roll(s): (${opp.initDie.join(' + ')}) + ${this.showInitiativeMods(opp.stats, opp.combatSense)}`;
  }

}
