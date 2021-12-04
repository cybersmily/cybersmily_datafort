import { NrNodeType } from './../enums/nr-node-type';
import { NrMapDefaults } from '../enums/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { Component, Input, OnInit } from '@angular/core';
import { NrDatafortRefDataVr } from '../models/nr-datafort-ref-data-vr';

@Component({
  selector: 'cs-cp2020-datafort-editor',
  templateUrl: './cp2020-datafort-editor.component.html',
  styleUrls: ['./cp2020-datafort-editor.component.css']
})
export class Cp2020DatafortEditorComponent implements OnInit {
  NrNodeType = NrNodeType;
  NrMapDefaults = NrMapDefaults;
  currDatafort: Cp2020NrDatafort;

  @Input()
  cp2020DatafortRefData: NrDatafortRefDataVr;

  constructor(private datafortBuilderService: Cp2020DatafortBuilderService) { }

  ngOnInit(): void {
    this.datafortBuilderService.datafort.subscribe(datafort => {
      this.currDatafort = new Cp2020NrDatafort(datafort);
    });
  }

  update() {
    this.datafortBuilderService.update(this.currDatafort);
  }

}
