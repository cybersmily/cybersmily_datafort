import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SaveFileService } from './../../shared/services/save-file.service';
import { CmbtTrckOppSelection } from './../models/cmbt-trck-opp-selection';
import { faDice, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cp2020_WOUND_LEVELS } from './../../shared/models/cp2020character/cp2020-wound-levels.enum';
import { OpponentTrackerService } from './../services/opponent-tracker.service';
import { CmbtTrckOpponent } from './../models/cmbt-trck-opponent';
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
  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered'
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
    private modalService: BsModalService) {}

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
    this.opponentService.removeOpponent(index);
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
    this.selectedOpponent = this.opponents[index];
  }

  changeInitiative() {
    this.opponentService.sortInitiative();
  }

  changeOpponent(value: CmbtTrckOppSelection) {
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
      this.handleUpload(file);
    } else {
      alert('Please select a combat tracker .json file to load.');
    }
  }

   /**
   * Promise to do the FileReader loading of the file.
   *
   * @param {*} inputFile - File to read
   * @returns
   * @memberof AppCharacterGeneratorFormComponent
   */
  readUploadedFileAsText(inputFile) {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  }


  /**
   * Handle the uploading of the file to the page.
   *
   * @param {*} event - event form the input element.
   * @memberof AppCharacterGeneratorFormComponent
   */
  handleUpload(file) {
    try {
      this.readUploadedFileAsText(file).then(
        (value: string) => {
          const opps = JSON.parse(value);
          if ( Array.isArray(opps)) {
            this.opponentService.importArray(opps);
          } else {
            alert( 'Error while reading the file. The content was corrupted.');
          }
        }
      );
    } catch (e) {
      alert('Error with reading the file. Please make sure that the file\'s content wasn\'t altered.' );
      console.log(e.message);
    }
  }
}
