import { faUndo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DruglabToPDF } from './../../shared/models/pdf/druglab-to-pdf';
import { Cp2020DrugList } from './../../shared/models/drug/cp2020-drug-list';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'cs-drug-lab-list',
  templateUrl: './drug-lab-list.component.html',
  styleUrls: ['./drug-lab-list.component.css']
})
export class DrugLabListComponent implements OnInit {
  faUndo = faUndo;
  faTrash = faTrash;

  @Input()
  drugList: Cp2020DrugList = new Cp2020DrugList();

  @Output()
  selectItem: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  deleteItem: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  resetList: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('pdfContent', {static: false})
  pdfContent: ElementRef;

  pdf: DruglabToPDF = new DruglabToPDF();

  constructor() { }

  ngOnInit() {
  }

  select(index: number) {
    this.selectItem.emit(index);
  }

  delete(index: number) {
    this.deleteItem.emit(index);
  }

  saveToPDF() {
    this.pdf.generatePdf(this.drugList);
  }

  reset() {
    this.resetList.emit(true);
  }

}
