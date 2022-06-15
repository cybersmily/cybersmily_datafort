import { Club } from './../../models/club';
import { faDice, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../../../services/dice/dice.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Clubber } from '../../models';

@Component({
  selector: 'cs-clubber-display',
  templateUrl: './clubber-display.component.html',
  styleUrls: ['./clubber-display.component.css'],
})
export class ClubberDisplayComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;

  @Input()
  clubbers: Array<Clubber> = new Array<Clubber>();

  @Output()
  updateClubbers: EventEmitter<Array<Clubber>> = new EventEmitter<
    Array<Clubber>
  >();

  constructor(private dice: DiceService) {}

  ngOnInit(): void {}

  rollClubber(num: number): void {
    const clubber: Clubber = {
      ages: 20,
      styles: '',
      stats: {
        int: 0,
        attr: 0,
        emp: 0,
        ref: 0,
        cool: 0,
        body: 0,
        ma: 0,
        tech: 0,
        luck: 0,
      },
      skills: [],
      haircolor: '',
      hairstyle: '',
      cyberware: [],
    };
  }

  deleteClubber(index: number): void {}
}
