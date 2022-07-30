import { faPen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-role-display',
  templateUrl: './cp-red-role-display.component.html',
  styleUrls: ['./cp-red-role-display.component.css'],
})
export class CpRedRoleDisplayComponent implements OnInit {
  faPen = faPen;
  faSave = faSave;
  faTrash = faTrash;
  isEditing = false;

  constructor() {}

  ngOnInit(): void {}

  saveChanges(): void {
    this.isEditing = false;
  }

  delete(): void {}
}
