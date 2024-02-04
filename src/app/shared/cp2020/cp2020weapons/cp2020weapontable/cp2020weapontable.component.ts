import { Cp2020RandomWeaponSettingsService } from './../services/cp2020-random-weapon-settings/cp2020-random-weapon-settings.service';
import { RandomWeaponGeneratorService } from './../services/random-weapon-generator/random-weapon-generator.service';
import { Cp2020PlayerSkill } from './../../cp2020-skills/models/cp2020-player-skill';
import { CpWeaponListParam } from './../models/cp-weapon-list-param';
import { Cp2020StatBlock } from './../../cp2020-stats/models/cp2020-stat-block';
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
import { RandomWeaponSettings } from '../models/random-weapon-filters';

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

  wpnFilterSettings: RandomWeaponSettings;

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
    private randomWeaponService: RandomWeaponGeneratorService,
    private randomWeaponSettings: Cp2020RandomWeaponSettingsService
  ) {}

  ngOnInit(): void {
    this.randomWeaponSettings.settings.subscribe(settings => {
      this.wpnFilterSettings = settings;
    });
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
      .generateList(this.wpnFilterSettings.filters, this.wpnFilterSettings.count)
      .subscribe((data: Array<CpPlayerWeapon>) => {
        if(data.length < 1 ) {
          alert('Filter options in settings produced 0 results in the random table. Please select more options in settings Digit.');
          return;
        }
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
    this.modalRef?.hide();
  }

  updateAmmo(ammo: Array<Cp2020PlayerAmmo>) {
    this.weapons.ammo = new Array<Cp2020PlayerAmmo>(...ammo);
    this.changeWeapons.emit(this.weapons);
  }
}
