import { CPRedCharacterSheet } from './../../../models/cp-red-character-sheet';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-form',
  templateUrl: './cp-red-character-form.component.html',
  styleUrls: ['./cp-red-character-form.component.css'],
})
export class CpRedCharacterFormComponent implements OnInit, OnChanges {
  currSheet: CPRedCharacterSheet = new CPRedCharacterSheet();

  @Input()
  sheet: CPRedCharacterSheet = new CPRedCharacterSheet();

  @Output()
  updateSheet: EventEmitter<CPRedCharacterSheet> = new EventEmitter<CPRedCharacterSheet>();

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(): void {
    this.initialize();
  }

  initialize(): void {
    console.log('initialize', this.sheet.character);
    this.currSheet = new CPRedCharacterSheet(this.sheet.character);
  }

  updateImage(image: string): void {
    this.currSheet.character.image = image;
    this.update();
  }

  update(): void {
    console.log('beforeSheet', this.sheet.character);
    console.log('currCharacter', this.currSheet.character);
    this.updateSheet.emit(this.currSheet);
  }
}
