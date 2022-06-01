import { DOCUMENT } from '@angular/common';
import {
  faFile,
  faFilePdf,
  faUpload,
  faUndo,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'cs-cp-red-character-main',
  templateUrl: './cp-red-character-main.component.html',
  styleUrls: ['./cp-red-character-main.component.css'],
})
export class CpRedCharacterMainComponent implements OnInit {
  faFile = faFile;
  faFilePdf = faFilePdf;
  faUpload = faUpload;
  faUndo = faUndo;
  faQuestionCircle = faQuestionCircle;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    console.log(this.document.body.style);
    this.document.body.style.backgroundImage = 'linear-gradient(#F00, #EEE)';
  }

  save() {}

  upload() {}

  saveAsPdf() {}

  reset() {}
}
