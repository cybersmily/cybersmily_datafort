import { CPRedLifepathJumpStart } from './../models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-lifepath-jumpstart',
  templateUrl: './cp-red-lifepath-jumpstart.component.html',
  styleUrls: ['./cp-red-lifepath-jumpstart.component.css']
})
export class CpRedLifepathJumpstartComponent implements OnInit {

  @Input()
  lifepath:CPRedLifepathJumpStart = new CPRedLifepathJumpStart();

  constructor() { }

  ngOnInit(): void {
  }

}
