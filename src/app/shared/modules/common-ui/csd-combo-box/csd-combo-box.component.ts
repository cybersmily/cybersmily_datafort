import { KeyValue } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'cs-csd-combo-box',
    templateUrl: './csd-combo-box.component.html',
    styleUrls: ['./csd-combo-box.component.css'],
    standalone: false
})
export class CsdComboBoxComponent implements OnInit, OnChanges {
  @Input() list: string[] = new Array<string>();

  @Input()
  inputItem = '';

  selectedIndex = -1;

  @Output()
  onSelectedItem: EventEmitter<string> = new EventEmitter<string>();


  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  // the list to be shown after filtering
  filteredList: string[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredList = this.list;
    this.selectedIndex = this.list.findIndex(item => item === this.inputItem);
  }
  ngOnChanges() {
    this.filteredList = this.list;
    this.selectedIndex = this.list.findIndex(item => item === this.inputItem);
  }

  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter((item) => item.toLowerCase().includes(this.inputItem.toLowerCase()));
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind) {
    if (ind > -1) {
      this.inputItem = this.filteredList[ind];
    }
    this.listHidden = true;
    this.selectedIndex = ind;
    this.onSelectedItem.emit(this.inputItem);
  }

  // navigate through the list of items
  onKeyPress(event) {
    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      } else if (event.key === 'Enter') {
        this.selectedIndex = this.list.findIndex(item => item === this.inputItem);
        this.toggleListDisplay(0);
      } else if (event.key === 'ArrowDown') {
        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    if (sender === 1) {
      this.listHidden = false;
      this.getFilteredList();
    } else {
      this.selectItem(this.selectedIndex);
      this.listHidden = true;
    }
  }
}
