import { DiceService } from './../../shared/services/dice/dice.service';
import { CmbtTrckOppChartService } from './../services/cmbt-trck-opp-chart.service';
import { faDice, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import { CpPlayerWeapon } from './../../shared/models/weapon';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cmbt-trk-wpns',
  templateUrl: './cmbt-trk-wpns.component.html',
  styleUrls: ['./cmbt-trk-wpns.component.css']
})
export class CmbtTrkWpnsComponent implements OnInit {
  faDice = faDice;
  faTrash = faTrash;
  faPlus = faPlus;

  @Input()
  weapons = new Array<CpPlayerWeapon>();

  @Output()
  newWeapon = new EventEmitter<Array<CpPlayerWeapon>>();

  @Input()
  BodDmgMod = 0;

  newWpn: CpPlayerWeapon = new CpPlayerWeapon();

  constructor(private oppChart: CmbtTrckOppChartService, private dice: DiceService) { }

  ngOnInit() {
  }

  addWeapon() {
    this.weapons.push(this.newWpn);
    this.newWpn = new CpPlayerWeapon();
    this.newWeapon.emit(this.weapons);
  }

  generate() {
    this.oppChart.generateWeapon(1)
    .subscribe( wpns => {
      wpns.forEach( w => {
        this.weapons.push(w);
      });
      this.newWeapon.emit(this.weapons);
    });
  }

  deleteWeapon(index: number) {
    this.weapons.splice(index, 1);
    this.newWeapon.emit(this.weapons);
  }

}
