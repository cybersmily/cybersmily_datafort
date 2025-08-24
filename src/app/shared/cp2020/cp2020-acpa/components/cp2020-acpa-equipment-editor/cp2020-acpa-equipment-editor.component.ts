import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Cp2020ACPAComponent } from './../../models/cp2020-acpa-component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cs-cp2020-acpa-equipment-editor',
    templateUrl: './cp2020-acpa-equipment-editor.component.html',
    styleUrls: ['./cp2020-acpa-equipment-editor.component.css'],
    standalone: false
})
export class Cp2020AcpaEquipmentEditorComponent implements OnInit {
  faSave = faSave;

  @Input()
  acpaComponent: Cp2020ACPAComponent;

  @Output()
  updateEquipment: EventEmitter<Cp2020ACPAComponent> = new EventEmitter<Cp2020ACPAComponent>();

  currComponent: Cp2020ACPAComponent = new Cp2020ACPAComponent();

  constructor() {
    if (this.acpaComponent) {
      this.currComponent = new Cp2020ACPAComponent(this.acpaComponent);
    }
  }

  ngOnInit(): void {}

  save(): void {
    this.currComponent.category = 'customComponent';
    this.currComponent.spaces =
      this.currComponent.spaces < 1 ? 1 : this.currComponent.spaces;
    this.updateEquipment.emit(this.currComponent);
    this.currComponent = new Cp2020ACPAComponent();
  }
}
