import { faTimes, faPlus, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CrCzUnit } from '../models/cr-cz-unit-card';
import { CrCzArmyBuilderService } from '../services/cr-cz-army-builder/cr-cz-army-builder.service';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';
import { iCrCzNrProgramCard } from '../models/cr-cz-nr-program-card';

@Component({
  selector: 'cs-cr-cz-unit-form',
  templateUrl: './cr-cz-unit-form.component.html',
  styleUrl: './cr-cz-unit-form.component.css',
})
export class CrCzUnitFormComponent implements OnInit, OnChanges {
  faTimes = faTimes;
  faPlus = faPlus;
  faTrash = faTrash;
  faStar = faStar;

  @Input()
  unitIndex: number;

  @Input()
  squadIndex: number;

  @Input()
  totalStreetcred: number = 0;

  unit$: Observable<CrCzUnit>;
  unit: CrCzUnit;

  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-right modal-xl',
    animated: true,
  };

  constructor(
    private combatzoneArmyBuilder: CrCzArmyBuilderService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.combatzoneArmyBuilder
      .getUnit(this.squadIndex, this.unitIndex)
      .subscribe((unit) => {
        this.unit = new CrCzUnit(unit);
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.combatzoneArmyBuilder
      .getUnit(this.squadIndex, this.unitIndex)
      .subscribe((unit) => {
        this.unit = new CrCzUnit(unit);
      });
  }

  toggleToken(actionIndex: number): void {
    this.unit.actionTokens[actionIndex].isUsed =
      !this.unit.actionTokens[actionIndex].isUsed;
    this.combatzoneArmyBuilder.updateUnit(
      this.squadIndex,
      this.unitIndex,
      this.unit
    );
  }

  toggleHacked(): void {
    this.unit.isHacked = !this.unit.isHacked;
    this.combatzoneArmyBuilder.updateUnit(
      this.squadIndex,
      this.unitIndex,
      this.unit
    );
  }

  toggleVulnerable(): void {
    this.unit.isVulnerable = !this.unit.isVulnerable;
    this.combatzoneArmyBuilder.updateUnit(
      this.squadIndex,
      this.unitIndex,
      this.unit
    );
  }

  toggleWound(actionIndex: number): void {
    this.unit.actionTokens[actionIndex].isRed =
      !this.unit.actionTokens[actionIndex].isRed;
    this.combatzoneArmyBuilder.updateUnit(
      this.squadIndex,
      this.unitIndex,
      this.unit
    );
  }

  toggleKill(): void {
    this.unit.isDead = !this.unit.isDead;
    this.combatzoneArmyBuilder.updateUnit(
      this.squadIndex,
      this.unitIndex,
      this.unit
    );
  }

  showModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  addGeaItem(gear: iCrCzGearItemCard): void {
    if (gear) {
      this.unit.gearCards.push(gear);
      this.combatzoneArmyBuilder.updateUnit(
        this.squadIndex,
        this.unitIndex,
        this.unit
      );
    }
  }

  removeGear(gearIndex: number): void {
    if(gearIndex > -1 && gearIndex < this.unit.gearCards.length) {
      this.unit.gearCards.splice(gearIndex, 1);
      this.combatzoneArmyBuilder.updateUnit(
        this.squadIndex,
        this.unitIndex,
        this.unit
      );
    }
  }


  addProgram(program: iCrCzNrProgramCard): void {
    if (program) {
      this.unit.programs.push(program);
      this.combatzoneArmyBuilder.updateUnit(
        this.squadIndex,
        this.unitIndex,
        this.unit
      );
    }
  }

  removeProgram(programIndex: number): void {
    if(programIndex > -1 && programIndex < this.unit.programs.length) {
      this.unit.programs.splice(programIndex, 1);
      this.combatzoneArmyBuilder.updateUnit(
        this.squadIndex,
        this.unitIndex,
        this.unit
      );
    }
  }

  addLoot(loot: any): void {}
}
