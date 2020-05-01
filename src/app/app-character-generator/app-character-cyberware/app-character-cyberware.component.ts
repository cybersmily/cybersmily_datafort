import { Cp2020CharacterGeneratorService } from './../../shared/services/chargen/cp2020-character-generator.service';
import { Cp2020PlayerCyberList } from '../../shared/models/cyberware/cp2020-player-cyber-list';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cs-app-character-cyberware',
  templateUrl: './app-character-cyberware.component.html',
  styleUrls: ['./app-character-cyberware.component.css']
})
export class AppCharacterCyberwareComponent implements OnInit {

  @Input()
  cyberware = new Cp2020PlayerCyberList(17);

  @Output()
  changeCyberware = new EventEmitter<Cp2020PlayerCyberList>();

  constructor(private charGenService: Cp2020CharacterGeneratorService) { }

  ngOnInit() {
  }

  onChangeCyberware() {
    this.charGenService.changeCyberware(this.cyberware);
    // this.changeCyberware.emit(this.cyberware);
  }

}
