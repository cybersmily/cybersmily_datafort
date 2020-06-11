import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-wpn-customizer-main',
  templateUrl: './wpn-customizer-main.component.html',
  styleUrls: ['./wpn-customizer-main.component.css']
})
export class WpnCustomizerMainComponent implements OnInit {


  weapon: any = {};

  options: Array<any> = [
    {enabled: false, name: 'Smartgun', cost: '*2', option: [{wa: 2}]},
    {enabled: false, name: 'Magazine Extension x2', cost: 40, option: [{shots: '*2'}]},
    {enabled: false, name: 'Magazine Extension x3', cost: 80, option: [{shots: '*3'}]},
    {enabled: false, name: 'Interchangable barrel/receiver groups', cost: 200, option: [{ammo: 'any'}, {damage: 'any'}]},
    {enabled: false, name: 'Braces & Stocks', cost: 200, option: [{wa: 1}]},
    {enabled: false, name: 'New Frames', cost: '100-300'},
    {enabled: false, name: 'Better Cooling', cost: '50', option: [{rel: 1}]}
  ];

  constructor() { }

  ngOnInit() {
  }

}
