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

  deleteModifier(index: number): void {
    this.statsManager.deleteStatModifier(this.statName, index);
  }

  addModifier(): void {
    this.statsManager.addStatModifier(this.statName, { ...this.newMod });
    this.newMod = {
      name: null,
      value: null,
      active: true,
    };
  }
}
