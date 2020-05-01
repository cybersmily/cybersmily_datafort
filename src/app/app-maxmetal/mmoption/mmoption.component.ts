import { MaxMetalOption } from '../../shared/models/maxmetal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-mmoption',
  templateUrl: './mmoption.component.html',
  styleUrls: ['./mmoption.component.css']
})
export class MmoptionComponent implements OnInit {
  @Input()
  item: MaxMetalOption;

  constructor() { }

  ngOnInit() {
  }

}
