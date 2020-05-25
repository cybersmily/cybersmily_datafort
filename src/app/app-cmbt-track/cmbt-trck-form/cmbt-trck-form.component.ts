import { FileLoaderService } from './../../shared/services/file-loader/file-loader.service';
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
    private modalService: BsModalService,
    private fileLoader: FileLoaderService) {}

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

}
