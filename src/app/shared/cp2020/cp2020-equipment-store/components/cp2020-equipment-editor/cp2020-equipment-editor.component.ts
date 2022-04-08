import { Cp2020Equipment } from './../../models';
import { Store } from '@ngrx/store';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCp2020EquipmentAction } from '../../actions/cp2020-equipment.actions';

@Component({
  selector: 'cs-cp2020-equipment-editor',
  templateUrl: './cp2020-equipment-editor.component.html',
  styleUrls: ['./cp2020-equipment-editor.component.css']
})
export class Cp2020EquipmentEditorComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      cost: [0, Validators.min(0)],
      notes: [''],
      book: ['', Validators.maxLength(4)],
      page: [0, Validators.min(0)]
    });
  }


  addGear(): void {
    const newItem: Cp2020Equipment = {
      category: this.formGroup.value.category,
      name: this.formGroup.value.name,
      cost: this.formGroup.value.cost,
      notes: this.formGroup.value.notes,
      source: {
        book: this.formGroup.value.book,
        page: this.formGroup.value.page,
      }
    }
    this.store.dispatch(AddCp2020EquipmentAction(newItem));
  }

}
