import { faFile, faFilePdf, faUpload, faUndo, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-main',
  templateUrl: './cp-red-character-main.component.html',
  styleUrls: ['./cp-red-character-main.component.css']
})
export class CpRedCharacterMainComponent implements OnInit {
  faFile = faFile;
  faFilePdf = faFilePdf;
  faUpload = faUpload;
  faUndo = faUndo;
  faQuestionCircle = faQuestionCircle;

  constructor() { }

  ngOnInit(): void {
  }


  save() {}

  upload() {}

  saveAsPdf() {}

  reset() {}
}
