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
    {enabled: false, name: 'Magazine Extension x2', cost: 40, option: [{shots: '*2'}, {conc: 1}]},
    {enabled: false, name: 'Magazine Extension x3', cost: 80, option: [{shots: '*3'}, {conc: 2}]},
    {enabled: false, name: 'Interchangable barrel/receiver groups', cost: 200, option: [{ammo: 'any'}, {damage: 'any'}]},
    {enabled: false, name: 'Braces & Stocks', cost: 200, option: [{wa: 1}]},
    {enabled: false, name: 'New Frames', cost: '100-300'},
    {enabled: false, name: 'Better Cooling', cost: '50', option: [{rel: 1}]},
    {enabled: false, name: 'Grip', cost: '*0.3', type: ['P', 'SMG'], option: [{rel: 1},{Fastdraw: 1}]},
    {enabled: false, name: 'Grip', cost: '*0.6', type: ['RIF', 'SHG'], option: [{rel: 1}]},
    {enabled: false, name: 'Folding Stock (replaces)', cost: '*0.3', type: ['RIF', 'SHG', 'SMG'], option: [{conc: -1}, {wa: -1}]},
    {enabled: false, name: 'Folding Stock (added)', cost: '*0.3', type: ['P', 'SMG'], option: [ {wa: 1}]},
    {enabled: false, name: 'Electric Trigger', cost: '*1', option: [ {wa: 1}]},
    {enabled: false, name: 'Barrel - Chopping', cost: '*0.3', option: [ {wa: 1}]},
    {enabled: false, name: 'Barrel - Extension', cost: '*0.3', option: [ {wa: 1}]}
  ];

  constructor() { }

  ngOnInit() {
  }

}
