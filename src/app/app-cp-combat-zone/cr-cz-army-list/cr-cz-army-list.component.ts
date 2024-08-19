import { Component, OnInit } from '@angular/core';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { Observable, take } from 'rxjs';
import { CrCzSquad, iCrCzSquad } from '../models/cr-cz-squad';
import { faPlus, faStar, faTrash, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileLoaderService, SaveFileService } from './../../shared/services/file-services';
import { error } from 'protractor';


@Component({
  selector: 'cs-cr-cz-army-list',
  templateUrl: './cr-cz-army-list.component.html',
  styleUrls: ['./cr-cz-army-list.component.css']
})
export class CrCzArmyListComponent implements OnInit {
  faStar = faStar;
  faPlus = faPlus;
  faTrash = faTrash;
  faSave = faSave;
  faUpload = faUpload;

  newSquadFaction: string = '';
  newSquadName: string = '';
  selectedSquadIndex: number = 0;
  selectedSquadFaction: string = '';
  selectedSquadName: string = 'Choose a team...';
  builder$: Observable<Array<iCrCzSquad>>;
  showAdd: boolean = false;

  constructor(private combatzoneArmyBuilder: CrCzArmyBuilderService,
    private saveFileService: SaveFileService,
  private fileLoader: FileLoaderService){}

  ngOnInit(): void {
    this.builder$ = this.combatzoneArmyBuilder.army;
  }

  addSquad(index?: number): void {
    if(this.newSquadFaction === '' || this.newSquadName === '') {
      return;
    }
    let squad = new CrCzSquad();
    squad.faction = this.newSquadFaction;
    squad.name = this.newSquadName;
    this.combatzoneArmyBuilder.addSquad(squad);
    this.selectedSquadIndex = index;
    this.selectedSquadName = this.newSquadName;
    this.selectedSquadFaction = this.newSquadFaction ;
    this.newSquadFaction = '';
    this.newSquadName = '';
    this.showAdd = false;
  }

  removeSquad(squadIndex: number): void {
    this.combatzoneArmyBuilder.removeSquad(squadIndex);
    this.selectedSquadName = 'Choose a team...';
    this.selectedSquadFaction = '';
    this.selectedSquadIndex = -1;
  }

  selectSquad(faction: string, squadName: string, squadIndex: number): void {
    this.selectedSquadFaction = faction;
    this.selectedSquadName = squadName;
    this.selectedSquadIndex = squadIndex;
  }

  selectFaction(faction: string): void {
    this.newSquadFaction = faction;
  }

  removeUnit(squadIndex: number, unitIndex: number): void {
    this.combatzoneArmyBuilder.removeUnit(squadIndex, unitIndex);
  }

  saveArmy(): void {
    this.combatzoneArmyBuilder.army.pipe(take(1)).subscribe( army =>
    this.saveFileService.SaveAsFile('CR-CombatZone-teams', JSON.stringify(army), 'json'));
  }

  loadArmy($event): void {
    const file = $event.target.files[0];
    const name: string = file.name;
    if (name && name.endsWith('.json')) {
      this.fileLoader.importJSON(file).subscribe(data => {
        if ( Array.isArray(data)) {
          try {
            this.combatzoneArmyBuilder.importArmy(data).pipe(take(1)).subscribe( result => {
              if(result) {
                this.selectedSquadIndex = 0;
              }
            });
          } catch(err) {
            alert( 'Error while reading the file. The content was corrupted. \n' + err.message);
            console.debug(err);
          }
        } else {
          alert( 'Error while reading the file. The content was corrupted.');
        }
      });
    } else {
      alert('Please select a previous CR-CombatZone-teams .json file from this applciation to load.');
    }
  }

}
