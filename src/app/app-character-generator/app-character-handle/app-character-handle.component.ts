import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-handle',
  templateUrl: './app-character-handle.component.html',
  styleUrls: ['./app-character-handle.component.css']
})
export class AppCharacterHandleComponent implements OnInit {

  @Input()
  handle: string;

  @Output()
  changeHandle = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onHandleChange() {
    this.changeHandle.emit(this.handle);
  }
}
