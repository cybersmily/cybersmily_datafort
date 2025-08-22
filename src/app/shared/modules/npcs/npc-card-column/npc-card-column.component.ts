import { Component, OnInit, Input } from '@angular/core';
import { NpcCard } from '../../../models/character';

@Component({
    selector: 'cs-npc-card-column',
    templateUrl: './npc-card-column.component.html',
    styleUrls: ['./npc-card-column.component.css'],
    standalone: false
})
export class NpcCardColumnComponent implements OnInit {

  @Input()
  npcList: NpcCard[] = new Array<NpcCard>();

  constructor() { }

  ngOnInit() {
  }

}
