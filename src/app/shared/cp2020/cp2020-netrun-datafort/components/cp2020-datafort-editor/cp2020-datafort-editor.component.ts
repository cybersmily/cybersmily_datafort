import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cp2020Program } from '../../../cp2020-netrun-gear/models/cp2020-program';
import { KeyValue } from '@angular/common';
import {
  faChevronDown,
  faChevronRight,
  faDice,
  faPen,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NrNodeType, NrMapDefaults } from '../../enums';
import { Cp2020DatafortBuilderService } from '../../services';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NrDatafortRefData, Cp2020NrDatafort } from '../../models';

@Component({
  selector: 'cs-cp2020-datafort-editor',
  templateUrl: './cp2020-datafort-editor.component.html',
  styleUrls: ['./cp2020-datafort-editor.component.css'],
})
export class Cp2020DatafortEditorComponent implements OnInit {
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faDice = faDice;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;
  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  NrNodeType = NrNodeType;
  NrMapDefaults = NrMapDefaults;
  currDatafort: Cp2020NrDatafort;

  isCodegatesCollapsed = true;
  isSkillsCollapsed = true;
  isMemoryCollapsed = true;
  isRemotesCollapsed = true;
  isDefensesCollapsed = true;
  isNotesCollapsed = true;

  newSkill: KeyValue<string, number> = { key: '', value: 4 };
  selectedProgram: Cp2020Program = new Cp2020Program();
  selectedProgramIndex = -1;

  @Input()
  cp2020DatafortRefData: NrDatafortRefData;

  constructor(
    private datafortBuilderService: Cp2020DatafortBuilderService,
    private modalService: BsModalService
  ) {}

  get usedFileCount(): number {
    return this.currDatafort.mu.filter((mu) => mu.key !== '').length;
  }

  ngOnInit(): void {
    this.datafortBuilderService.datafort.subscribe((datafort) => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
    });
  }

  update() {
    this.datafortBuilderService.update(this.currDatafort);
  }

  addSkill() {
    this.datafortBuilderService.addSkill(this.newSkill);
    this.newSkill = { key: '', value: 4 };
  }

  removeRemote(index: number) {
    this.datafortBuilderService.removeRemoteByIndex(index);
  }

  removeDefense(index: number) {
    this.datafortBuilderService.removeDefenseByIndex(index);
  }
  removeSkill(index: number) {
    this.datafortBuilderService.removeSkillByIndex(index);
  }

  deleteSkill(index: number) {
    this.datafortBuilderService.removeSkill(index);
  }

  updateProgram(program: Cp2020Program) {
    if (this.selectedProgramIndex > -1) {
      this.currDatafort.defenses[this.selectedProgramIndex].program =
        new Cp2020Program(program);
      this.update();
    }
    this.selectedProgramIndex = -1;
    this.selectedProgram = new Cp2020Program();
  }

  showSelected(index: number, template: TemplateRef<any>) {
    if (index > -1 && index < this.currDatafort.defenses.length) {
      this.selectedProgramIndex = index;
      this.selectedProgram = new Cp2020Program(
        this.currDatafort.defenses[index].program
      );
      this.modalRef = this.modalService.show(template, this.config);
    }
  }
}
