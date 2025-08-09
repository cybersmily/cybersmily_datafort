import { faDice, faSave, faUpload, faImage, faSkullCrossbones, faCogs, faLock, faFile, faPen, faCog, faFileImport, faFileImage } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-net-arch-instructions',
    templateUrl: './net-arch-instructions.component.html',
    styleUrls: ['./net-arch-instructions.component.css'],
    standalone: false
})
export class NetArchInstructionsComponent implements OnInit {
  faDice = faDice;
  faSave = faSave;
  faUpload = faUpload;
  faImage = faImage;
  faSkullCrossbones = faSkullCrossbones;
  faCogs = faCogs;
  faLock = faLock;
  faFile = faFile;
  faPen = faPen;
  faCog = faCog;
  faFileImage = faFileImage;

  constructor() { }

  ngOnInit(): void {
  }

}
