import { DiceService } from './../../shared/services/dice/dice.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { NameGeneratorService } from './../../shared/services/namegen/name-generator.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-handle',
  templateUrl: './app-character-handle.component.html',
  styleUrls: ['./app-character-handle.component.css']
})
export class AppCharacterHandleComponent implements OnInit {
  faDice = faDice;

  @Input()
  handle: string;

  @Output()
  changeHandle = new EventEmitter<string>();

  constructor(private nameService: NameGeneratorService) { }

  ngOnInit() {
  }

  onHandleChange() {
    this.changeHandle.emit(this.handle);
  }

  rollName() {
    this.nameService.generateName().subscribe( name => {
      this.handle = name;
      this.onHandleChange();
    });
  }
}
