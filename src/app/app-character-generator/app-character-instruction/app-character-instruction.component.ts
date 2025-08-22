import { faDice, faSave, faUpload, faFilePdf, faUndo, faShieldAlt, faCog, faCrosshairs, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-app-character-instruction',
    templateUrl: './app-character-instruction.component.html',
    styleUrls: ['./app-character-instruction.component.css'],
    standalone: false
})
export class AppCharacterInstructionComponent implements OnInit {
  faDice = faDice;
  faSave = faSave;
  faUpload = faUpload;
  faFilePdf = faFilePdf;
  faUndo = faUndo;
  faShieldAlt = faShieldAlt;
  faCog = faCog;
  faCrosshairs = faCrosshairs;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
