import { CP2077Kills } from './../models/cp2077-kills';
import { faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { Cp2077TrackerEntry } from './../models/cp2077-tracker-entry';
import { SaveFileService } from './../../shared/services/file-services';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-cp2077-tracker-main',
    templateUrl: './cp2077-tracker-main.component.html',
    styleUrls: ['./cp2077-tracker-main.component.css'],
    standalone: false
})
export class Cp2077TrackerMainComponent implements OnInit {
  faSave = faSave;
  faUpload = faUpload;

  data: Array<Cp2077TrackerEntry> = new Array<Cp2077TrackerEntry>();
  kills: CP2077Kills = new CP2077Kills();

  selectedCharacter: string = 'cf';
  filterName: string = '';
  key: string = 'CP2077Data';

  constructor(
    private dataService: DataService,
    private saveFileService: SaveFileService
  ) {}

  ngOnInit(): void {
    const local = localStorage.getItem(this.key);
    if (local) {
      const data = JSON.parse(local);
      this.data = data.items;
      this.kills = data.kills;
      this.selectedCharacter = data.v;
    } else {
      this.upload();
    }
  }

  missingOnThisV(name: string): boolean {
    return this.data.some(
      (item) => name === item.name && item[this.selectedCharacter] === ''
    );
  }

  get totalItems(): number {
    return this.data.length;
  }

  get currCount(): number {
    return this.data.filter((item) => item[this.selectedCharacter] !== '')
      .length;
  }

  get animalKills(): number {
    return this.data.reduce((a, b) => a + b.animalsKills, 0);
  }

  get totalItemsCollected(): number {
    return this.data.filter(
      (item) =>
        item.cf !== '' ||
        item.cm !== '' ||
        item.nf !== '' ||
        item.nm !== '' ||
        item.sm !== '' ||
        item.sf !== ''
    ).length;
  }

  getLocation(loc: number): string {
    switch (loc) {
      case 0:
        return 'Suit';
      case 1:
        return 'Head';
      case 2:
        return 'Face';
      case 3:
        return 'Outer Torso';
      case 4:
        return 'Inner Torso';
      case 5:
        return 'Legs';
      case 6:
        return 'Feet';
      default:
        return 'Unknown';
    }
  }

  get footWear(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 6);
  }
  get leggings(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 5);
  }
  get innerTorso(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 4);
  }
  get outerTorso(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 3);
  }
  get face(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 2);
  }
  get head(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 1);
  }
  get fullbody(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 0);
  }
  get misc(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item.location === 7);
  }

  get missing(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item[this.selectedCharacter] === '');
  }
  get totalMissing(): Array<Cp2077TrackerEntry> {
    return this.data.filter(
      (item) =>
        item.cf == '' &&
        item.cm == '' &&
        item.nf == '' &&
        item.nm == '' &&
        item.sf == '' &&
        item.sm == ''
    );
  }

  get unknown(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item[this.selectedCharacter] === '?');
  }
  get sex(): Array<Cp2077TrackerEntry> {
    return this.data.filter((item) => item[this.selectedCharacter] === '-');
  }

  IsMissing(item: string): boolean {
    return this.totalMissing.some((i) => i.name === item);
  }

  onClick($event, item: string, property: string, action: number) {
    $event.preventDefault();
    const i = this.data.findIndex((itm) => itm.name === item);
    if (i > -1) {
      this.data[i][property] += action;
      this.data[i][property] =
        this.data[i][property] < 0 ? 0 : this.data[i][property];
      this.store();
    }
  }

  onKill($event, property: string, action: number) {
    $event.preventDefault();
    this.kills[property] += action;
    this.kills[property] = this.kills[property] < 0 ? 0 : this.kills[property];
    this.store();
  }

  changeQuality() {
    this.store();
  }

  save() {
    this.saveFileService.SaveAsFile(
      'cp2077tracker',
      JSON.stringify({ kills: this.kills, items: this.data }),
      'json'
    );
  }

  upload() {
    this.dataService
      .GetJson<{ items: Array<Cp2077TrackerEntry>; kills: CP2077Kills }>(
        JsonDataFiles.CP2077_TRACKER_DATA_JSON
      )
      .subscribe((data) => {
        this.data = data.items;
        this.kills = data.kills;
        this.store();
      });
  }

  store() {
    window.localStorage.setItem(
      this.key,
      JSON.stringify({
        v: this.selectedCharacter,
        kills: this.kills,
        items: this.data,
      })
    );
  }
}
