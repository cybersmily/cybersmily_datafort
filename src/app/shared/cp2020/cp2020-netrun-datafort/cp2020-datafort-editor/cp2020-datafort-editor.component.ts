import { KeyValue } from '@angular/common';
import { faChevronDown, faChevronRight, faDice, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NrNodeType } from './../enums/nr-node-type';
import { NrMapDefaults } from '../enums/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { Component, Input, OnInit } from '@angular/core';
import { NrDatafortRefData } from '../models/nr-datafort-ref-data';

@Component({
  selector: 'cs-cp2020-datafort-editor',
  templateUrl: './cp2020-datafort-editor.component.html',
  styleUrls: ['./cp2020-datafort-editor.component.css']
})
export class Cp2020DatafortEditorComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faDice = faDice;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  NrNodeType = NrNodeType;
  NrMapDefaults = NrMapDefaults;
  currDatafort: Cp2020NrDatafort;

  isCodegatesCollapsed = true;
  isSkillsCollapsed = true;
  isMemoryCollapsed = true;
  isRemotesCollapsed = true;
  isDefensesCollapsed = true;

  newSkill: KeyValue<string, number> = {key: '', value: 4};

  @Input()
  cp2020DatafortRefData: NrDatafortRefData;

  constructor(private datafortBuilderService: Cp2020DatafortBuilderService) { }

  get usedFileCount(): number {
    return this.currDatafort.mu.filter(mu => mu.key !== '').length;
  }

  ngOnInit(): void {
    this.datafortBuilderService.datafort.subscribe(datafort => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
    });
  }

  update() {
    this.datafortBuilderService.update(this.currDatafort);
  }

  addSkill() {
    this.datafortBuilderService.addSkill(this.newSkill);
    this.newSkill = {key: '', value: 4};
  }

  deleteSkill(index: number) {
    this.datafortBuilderService.removeSkill(index);
  }
}
