import { Observable, map } from 'rxjs';
import { CpRedStatsManagerService } from './../../services/cp-red-stats-manager/cp-red-stats-manager.service';
import { CpRedStatMod, CpRedCharacterStat, CpRedStat } from '../../models';
import {
  faPlus,
  faChevronDown,
  faChevronRight,
  faTrash,
  faDotCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
    selector: 'cs-cp-red-stat-editor',
    templateUrl: './cp-red-stat-editor.component.html',
    styleUrls: ['./cp-red-stat-editor.component.css'],
    standalone: false
})
export class CPRedStatEditorComponent implements OnInit {
  faPlus = faPlus;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faIcon = this.faChevronRight;
  faTrash = faTrash;
  faDotCircle = faDotCircle;
  faCheckCircle = faCheckCircle;

  showModifiers = false;

  newMod: CpRedStatMod = {
    name: null,
    value: null,
    active: true,
  };

  @Input()
  statName: string;

  constructor(private statsManager: CpRedStatsManagerService) {}

  ngOnInit(): void {}

  get stat(): Observable<CpRedCharacterStat> {
    return this.statsManager.characterStats.pipe(
      map((stats) => stats[this.statName])
    );
  }

  updateStatBase(value: number): void {
    this.statsManager.updateStatBase(this.statName, Number(value));
  }

  toggleModifiers(): void {
    this.showModifiers = !this.showModifiers;
    this.faIcon = this.showModifiers ? this.faChevronDown : this.faChevronRight;
  }

  activateModifier(index: number): void {
    this.statsManager.toggleStatModifierActive(this.statName, index);
  }

  getModifierTotal(modifiers: Array<CpRedStatMod>): number {
    if (modifiers == null) {
      return 0;
    }
    return modifiers.reduce(
      (total, mod) => total + (mod.active ? mod.value : 0),
      0
    );
  }

  deleteModifier(modifier: CpRedStatMod): void {
    this.statsManager.deleteStatModifier(this.statName, modifier);
  }

  addModifier(): void {
    this.statsManager.addStatModifier(this.statName, { ...this.newMod });
    this.newMod = {
      name: null,
      value: null,
      active: true,
    };
  }

  get disableAddStatMod$(): Observable<boolean> {
    return this.statsManager
      .hasStatModifier(this.statName, this.newMod.name)
      .pipe(
        map(
          (found) =>
            found ||
            !this.newMod.name ||
            this.newMod.name === '' ||
            !this.newMod.value
        )
      );
  }
}
