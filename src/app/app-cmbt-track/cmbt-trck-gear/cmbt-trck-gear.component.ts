import { faPlus, faDice, faTrash, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmbtTrckOppChartService } from './../services/cmbt-trck-opp-chart.service';
import { OppCyberware } from './../../shared/cp2020/cp2020-cyberware/models';

@Component({
  selector: 'cs-cmbt-trck-gear',
  templateUrl: './cmbt-trck-gear.component.html',
  styleUrls: ['./cmbt-trck-gear.component.css']
})
export class CmbtTrckGearComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;
  faPlus = faPlus;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  @Input()
  gear = new Array<string>();

  @Input()
  isCollapsed = true;

  @Output()
  newGear = new EventEmitter<Array<string>>();

  addedGear = '';

  constructor(private oppCharts: CmbtTrckOppChartService) { }

  ngOnInit() {
  }

  add() {
    const gear = this.addedGear === '' ? `item ${this.gear.length + 1}` : this.addedGear;
    this.gear.push(gear);
    this.addedGear = '';
    this.newGear.emit(this.gear);
  }

  delete(index: number) {
    this.gear.splice(index, 1);
    this.newGear.emit(this.gear);
  }

  generate(event) {
    this.oppCharts.generateCyberware(3)
    .subscribe( item => {
      //this.gear.push(item);
      this.newGear.emit(this.gear);
    });
    event.stopPropagation();
  }
}
