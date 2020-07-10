import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { NetRunProgram } from './../../shared/models/netrun';

@Component({
  selector: 'cs-program-main',
  templateUrl: './program-main.component.html',
  styleUrls: ['./program-main.component.css']
})
export class ProgramMainComponent implements OnInit {

  newProgram: NetRunProgram = new NetRunProgram();
  programList: Array<NetRunProgram> = new Array<NetRunProgram>();

  private _key = 'csd-prog-gen-list';

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMeta('Cybersmily\'s Datafort Program Generator',
    'Cybersmily\'s Datafort Program Generator help created Netrunner programs for Cyberpunk 2020. ');
    this.programList = this.cache;
  }

  set cache(list: Array<NetRunProgram>) {
    window.localStorage.setItem(this._key, JSON.stringify(this.programList));
  }

  get cache(): Array<NetRunProgram> {
    const newList = new Array<NetRunProgram>();
    if (window.localStorage.getItem(this._key)) {
      const list: any[] = JSON.parse(window.localStorage.getItem(this._key));
      list.forEach( prog => {
        newList.push(new NetRunProgram(prog));
      });
    }
    return newList.sort( (a, b) => (a.name > b.name) ? 1 : -1);
  }

  updateProgram(prog: NetRunProgram) {
    const index = this.programList.findIndex(p => p.name.toLowerCase() === prog.name.toLowerCase());
    if (index > -1) {
      this.programList[index] = prog;
    } else {
      this.programList.push(prog);
    }
    this.programList.sort( (a, b) => (a.name > b.name) ? 1 : -1);
    this.newProgram = new NetRunProgram();
    this.cache = this.programList;
  }

  createProgram() {
    this.newProgram = new NetRunProgram();
  }

  deleteProgram(index: number) {
    this.programList.splice(index, 1);
    this.cache = this.programList;
  }

  selectProgram(index: number) {
    if (index > -1 && index < this.programList.length) {
      this.newProgram = this.programList[index];
    }
  }

  uploadList(list: Array<NetRunProgram>) {
    this.programList = list;
    this.cache = this.programList;
  }

  resetList() {
    this.programList = new Array<NetRunProgram>();
    this.cache = this.programList;
  }
}
