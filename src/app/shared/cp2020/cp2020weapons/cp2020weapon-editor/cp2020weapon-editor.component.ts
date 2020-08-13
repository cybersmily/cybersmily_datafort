import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon } from './../../../models/weapon';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-editor',
  templateUrl: './cp2020weapon-editor.component.html',
  styleUrls: ['./cp2020weapon-editor.component.css']
})
export class Cp2020weaponEditorComponent implements OnInit {
  faSave = faSave;

  @Input()
  weapon: CpPlayerWeapon = new CpPlayerWeapon();

  @Output()
  updateWeapon: EventEmitter<CpPlayerWeapon> = new EventEmitter<CpPlayerWeapon>();

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  update() {
    if (this.weapon.name && this.weapon.name !== '') {
      this.updateWeapon.emit(this.weapon);
      this.weapon = new CpPlayerWeapon();
    }
  }
}
