import { Cp2020Equipment } from './../../models';
import { Store } from '@ngrx/store';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cs-cp2020-equipment-editor',
  templateUrl: './cp2020-equipment-editor.component.html',
  styleUrls: ['./cp2020-equipment-editor.component.css'],
})
export class Cp2020EquipmentEditorComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  formGroup: FormGroup;

  @Input()
  equipment: Cp2020Equipment;

  @Output()
  updateEquipement: EventEmitter<Cp2020Equipment> = new EventEmitter<Cp2020Equipment>();

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      category: [this.equipment?.category ?? '', Validators.required],
      name: [this.equipment?.name ?? '', Validators.required],
      cost: [this.equipment?.cost ?? 0, Validators.min(0)],
      notes: [this.equipment?.notes ?? ''],
      book: [this.equipment?.source.book ?? '', Validators.maxLength(4)],
      page: [this.equipment?.source?.page ?? 0, Validators.min(0)],
    });
  }

  addGear(): void {
    const newItem: Cp2020Equipment = {
      category: this.formGroup.value.category,
      name: this.formGroup.value.name,
      cost: this.formGroup.value.cost,
      notes: this.formGroup.value.notes,
      wt: 0,
      source: {
        book: this.formGroup.value.book,
        page: this.formGroup.value.page,
      },
    };
    this.updateEquipement.emit(newItem);
  }
}
