import { OppCyberware } from './../../shared/cp2020/cp2020-cyberware/models';
import { faDice, faTrash, faPlus, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CmbtTrckOppChartService } from './../services/cmbt-trck-opp-chart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trk-cyber',
  templateUrl: './cmbt-trk-cyber.component.html',
  styleUrls: ['./cmbt-trk-cyber.component.css']
})
export class CmbtTrkCyberComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;
  faPlus = faPlus;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  @Input()
  cyberware = new Array<OppCyberware>();

  @Input()
  isCollapsed = true;

  @Output()
  newCyberware = new EventEmitter<Array<OppCyberware>>();

  newCyber: OppCyberware = new OppCyberware();

  constructor(private oppCharts: CmbtTrckOppChartService) { }

  ngOnInit() {
  }

  addCyber() {
    if(this.newCyber.name === '') {
      this.newCyber.name =  `cyber ${this.cyberware.length + 1}`;
    }
    this.cyberware.push(this.newCyber);
    this.newCyber = new OppCyberware();
    this.newCyberware.emit(this.cyberware);
  }

  delete(index: number) {
    this.cyberware.splice(index, 1);
    this.newCyberware.emit(this.cyberware);
  }

  generate(event) {
    this.oppCharts.generateCyberware(3)
    .subscribe( item => {
      item.forEach( cyber => {
        if (!cyber.options && !this.cyberware.some( c => c.name === cyber.name)) {
          this.cyberware.push(cyber);
        } else if ( cyber.options ) {
          const i = this.cyberware.findIndex(c => c.name === cyber.name);
          if ( i > -1) {
            const opts = cyber.options.split(',');
            const existing = this.cyberware[i].options.split(',');
            opts.forEach( o => {
              if (!existing.some( opt => opt.trim() === o.trim())) {
                existing.push(o);
              }
            });
            this.cyberware[i].options = existing.join(', ');
          } else {
            this.cyberware.push(cyber);
          }
        }
      });
      this.newCyberware.emit(this.cyberware);
    });
    event.stopPropagation();
  }

}
