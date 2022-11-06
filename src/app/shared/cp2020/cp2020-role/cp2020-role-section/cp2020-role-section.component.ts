import { Cp2020RolesDataService } from './../services/cp2020-roles-data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { Cp2020PlayerRole } from '../models/cp2020-player-role';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  faDice,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  Output,
  OnInit,
  TemplateRef,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020-role-section',
  templateUrl: './cp2020-role-section.component.html',
  styleUrls: ['./cp2020-role-section.component.css'],
})
export class Cp2020RoleSectionComponent implements OnInit, OnChanges {
  faDice = faDice;
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;

  modalRef: BsModalRef;
  config = {
    keyboard: true,
    class: 'modal-right modal-lg',
  };

  @Input()
  primaryRole: Cp2020PlayerRole = new Cp2020PlayerRole();

  @Input()
  secondaryRoles: Array<Cp2020PlayerRole> = new Array<Cp2020PlayerRole>();

  @Input()
  isIU: boolean = false;

  @Output()
  changePrimaryRole = new EventEmitter<Cp2020PlayerRole>();

  @Output()
  changeSecondaryRoles = new EventEmitter<Array<Cp2020PlayerRole>>();

  @ViewChild('roleEditorElem', { static: false })
  roleEditElem: ElementRef;

  currentPrimary: Cp2020PlayerRole = new Cp2020PlayerRole();
  currentSecondary: Array<Cp2020PlayerRole> = new Array<Cp2020PlayerRole>();

  get secondaryList(): string {
    return this.currentSecondary.map((r) => r.name).join(', ');
  }

  constructor(
    private modalService: BsModalService,
    private rolesService: Cp2020RolesDataService,
    private diceService: DiceService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  ngOnChanges(): void {
    this.loadRoles();
  }

  /**
   * load the currentRole and currentSecondaryRoles from the Inputs.
   *
   * @memberof Cp2020RoleSectionComponent
   */
  loadRoles() {
    this.currentPrimary = new Cp2020PlayerRole(this.primaryRole);
    this.currentSecondary = this.secondaryRoles.map((r) => {
      return new Cp2020PlayerRole(r);
    });
  }

  /**
   * When a role is changed in the input, this will emit the change up to the parent component.
   *
   * @memberof AppCharacterRoleComponent
   */
  onPrimaryChange(value: Cp2020PlayerRole) {
    this.changePrimaryRole.emit(value);
  }

  /**
   * When a role is changed in the input, this will emit the change up to the parent component.
   *
   * @memberof AppCharacterRoleComponent
   */
  onSecondaryChange(value: Cp2020PlayerRole, index: number) {
    this.currentSecondary[index] = value;
    this.changeSecondaryRoles.emit(this.currentSecondary);
  }

  /**
   * Randomly roll a role for the PC
   *
   * @memberof AppCharacterRoleComponent
   */
  rollPrimaryRole() {
    this.rolesService
      .rollRandomRole(this.diceService, this.isIU)
      .subscribe((role) => {
        this.onPrimaryChange(new Cp2020PlayerRole(role));
      });
  }

  addSecondary() {
    this.currentSecondary.push(new Cp2020PlayerRole());
    this.changeSecondaryRoles.emit(this.currentSecondary);
  }

  deleteRole(role: Cp2020PlayerRole) {
    const found = this.currentSecondary.findIndex((r) => r.name === role.name);
    if (found > -1) {
      this.currentSecondary.splice(found, 1);
      this.changeSecondaryRoles.emit(this.currentSecondary);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHidden.subscribe(() => {
      this.roleEditElem.nativeElement.focus();
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}
