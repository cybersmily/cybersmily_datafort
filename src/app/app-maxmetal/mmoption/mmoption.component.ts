import { MaxMetalOption } from '../../shared/cp2020/cp2020-vehicles/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cs-mmoption',
    templateUrl: './mmoption.component.html',
    styleUrls: ['./mmoption.component.css'],
    standalone: false
})
export class MmoptionComponent implements OnInit {
  @Input()
  item: MaxMetalOption;

  constructor() { }

  ngOnInit() {
  }

}
