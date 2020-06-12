import { Cp2020DrugList } from './../../shared/models/drug/cp2020-drug-list';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'cs-drug-lab-list',
  templateUrl: './drug-lab-list.component.html',
  styleUrls: ['./drug-lab-list.component.css']
})
export class DrugLabListComponent implements OnInit {

  @Input()
  drugList: Cp2020DrugList = new Cp2020DrugList();

  @Output()
  selectItem: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  deleteItem: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('pdfContent')
  pdfContent: ElementRef;

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
    const content = this.pdfContent.nativeElement;
    const doc = new jsPDF();
    const _elementHandlers = {
      '#editor': function(element, renderer){ return true; }
    };
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': _elementHandlers
    });
    doc.save('CP2020_DrugList.pdf');
  }

}
