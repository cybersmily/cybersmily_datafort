import { NpcProfileModalComponent } from './../npcProfileModal/npcprofilemodal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Component, OnInit, Input } from '@angular/core';
import { NpcCard } from '../../../models/character';

@Component({
    selector: 'cs-npc-card',
    templateUrl: './npc-card.component.html',
    styleUrls: ['./npc-card.component.css'],
    standalone: false
})
export class NpcCardComponent implements OnInit {

  @Input()
  npcCard: NpcCard = {name: '', img: '', career: ''};

  bsModalRef: BsModalRef;
  npcImage: string;

  constructor(public modalService: BsModalService) { }

  ngOnInit() {
    this.npcImage = `/img/peeps/th/th_${this.npcCard.img}.png`;
  }

  openModalWithComponent() {
    const initialState = {
      npcFile: `/json/peeps/${this.npcCard.career.toLowerCase()}/${this.npcCard.img}.json`
    };
    this.bsModalRef = this.modalService.show(NpcProfileModalComponent, {initialState, class: 'modal-lg'});
  }
}
