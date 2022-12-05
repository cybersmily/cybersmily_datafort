import { RandomWeaponGeneratorService } from './../services/random-weapon-generator/random-weapon-generator.service';
import { Cp2020PlayerSkill } from './../../cp2020-skills/models/cp2020-player-skill';
import { CpWeaponListParam } from './../models/cp-weapon-list-param';
import { DataWeapon } from './../models/data-weapon';
import { Cp2020StatBlock } from './../../cp2020-stats/models/cp2020-stat-block';
import { WeaponDataService } from './../services';
import { DiceService } from './../../../services/dice/dice.service';
import {
  CpPlayerWeaponList,
  CpPlayerWeapon,
  Cp2020PlayerAmmo,
} from './../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  faDice,
  faPlus,
  faCrosshairs,
  faCog,
  faCalculator,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Cp2020PlayerSkills } from './../../cp2020-skills/models';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'cs-cp2020weapontable',
  templateUrl: './cp2020weapontable.component.html',
  styleUrls: ['./cp2020weapontable.component.css'],
})
export class Cp2020weapontableComponent implements OnInit {
  faDice = faDice;
  faPlus = faPlus;
  faCrosshairs = faCrosshairs;
  faCog = faCog;
  faCalculator = faCalculator;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  isIUCollapsed = false;
  isWeaponsCollapsed = false;

  collapseChevron(isCollapsed: boolean): any {
    return isCollapsed ? faChevronRight : this.faChevronDown;
  }

  modalRef: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-right modal-lg',
  };
  newWeapon: CpPlayerWeapon = new CpPlayerWeapon();

  wpnParam: CpWeaponListParam = {};

  @Input()
  weapons: CpPlayerWeaponList = new CpPlayerWeaponList();

  @Input()
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  @Input()
  skills: Cp2020PlayerSkills = new Cp2020PlayerSkills();

  @Input()
  showRandomGenerator = false;

  @Input()
  showSelector = false;

  @Input()
  showCalculator = false;

  @Input()
  showIU = false;

  @Input()
  showAmmo = false;

  @Input()
  isCollapsed = false;

  @Output()
  changeWeapons: EventEmitter<CpPlayerWeaponList> =
    new EventEmitter<CpPlayerWeaponList>();

  @ViewChild('newWeaponElem', { static: false })
  newWeaponButton: ElementRef;

  get combatSense(): Cp2020PlayerSkill {
    return this.skills.specialAbilites.find(
      (sk) => sk.name.toLowerCase() === 'combat sense'
    );
  }

  constructor(
    private modalService: BsModalService,
    private diceService: DiceService,
    private weaponData: WeaponDataService,
    private randomWeaponService: RandomWeaponGeneratorService
  ) {}

  ngOnInit(): void {
    this.wpnParam = {
      type: ['PISTOLS', 'SMG', 'RIFLES', 'MELEE', 'SHOTGUNS'],
      subtype: ['LIGHT', 'MEDIUM', 'HEAVY', 'ASSAULT'],
      availability: ['E', 'C'],
    };
    this.isIUCollapsed = this.isCollapsed;
    this.isWeaponsCollapsed = this.isCollapsed;
  }

  updateWeapon(data: { index: number; weapon: CpPlayerWeapon }) {
    this.weapons.updateWeapon(data.index, data.weapon);
    this.changeWeapons.emit(this.weapons);
    this.closeModal();
  }

  deleteWeapon(index: number) {
    this.weapons.deleteWeapon(index);
    this.changeWeapons.emit(this.weapons);
  }

  addWeapon(wpn: CpPlayerWeapon) {
    this.weapons.addWeapon(wpn);
    this.changeWeapons.emit(this.weapons);
    this.closeModal();
  }

  addWeaponList(wpnList: Array<CpPlayerWeapon>) {
    this.weapons.addPlayerWeaponList(wpnList);
    this.changeWeapons.emit(this.weapons);
  }

  randomGenerateWeapon() {
    this.randomWeaponService
      .generateList(this.wpnParam, 1)
      .subscribe((data: Array<CpPlayerWeapon>) => {
        data.forEach((wpn) => {
          this.weapons.addDataWeapon(wpn);
        });
        this.changeWeapons.emit(this.weapons);
      });
  }

  openModal(template: TemplateRef<any>, returnFocus?: string) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
    if (returnFocus) {
      this.modalRef.onHidden.subscribe(() => {
        switch (returnFocus) {
          case 'newWeapon':
            this.newWeaponButton.nativeElement.focus();
            break;
        }
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

  updateAmmo(ammo: Array<Cp2020PlayerAmmo>) {
    this.weapons.ammo = new Array<Cp2020PlayerAmmo>(...ammo);
    this.changeWeapons.emit(this.weapons);
  }

  paramChecked(value: Array<string>, item: string): boolean {
    return (
      value &&
      value.some((t) => {
        return t === item;
      })
    );
  }

  addParam($event, type: string, value: string) {
    if (type === 'category') {
      if (this.wpnParam.type) {
        if ($event.target.checked) {
          this.wpnParam.type.push(value);
        } else {
          const i = this.wpnParam.type.findIndex((t) => t === value);
          this.wpnParam.type.splice(i, 1);
        }
      } else {
        this.wpnParam['type'] = new Array<string>();
        this.wpnParam.type.push(value);
      }
    }
    if (type === 'subcategory') {
      if (this.wpnParam.subtype) {
        if ($event.target.checked) {
          this.wpnParam.subtype.push(value);
        } else {
          const i = this.wpnParam.subtype.findIndex((t) => t === value);
          this.wpnParam.subtype.splice(i, 1);
        }
      } else {
        this.wpnParam['subtype'] = new Array<string>();
        this.wpnParam.subtype.push(value);
      }
    }
    if (type === 'avail') {
      if (this.wpnParam.availability) {
        if ($event.target.checked) {
          this.wpnParam.availability.push(value);
        } else {
          const i = this.wpnParam.availability.findIndex((t) => t === value);
          this.wpnParam.availability.splice(i, 1);
        }
      } else {
        this.wpnParam['availability'] = new Array<string>();
        this.wpnParam.availability.push(value);
      }
    }
    if (type === 'exclude') {
    }
  }
}
