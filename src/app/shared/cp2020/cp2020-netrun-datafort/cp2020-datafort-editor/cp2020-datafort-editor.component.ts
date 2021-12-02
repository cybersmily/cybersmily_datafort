import { NrMapDefaults } from '../enums/nr-map-defaults';
import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Cp2020DatafortBuilderService } from './../services/cp2020-datafort-builder.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020-datafort-editor',
  templateUrl: './cp2020-datafort-editor.component.html',
  styleUrls: ['./cp2020-datafort-editor.component.css']
})
export class Cp2020DatafortEditorComponent implements OnInit {
  NrMapDefaults = NrMapDefaults;
  currDatafort: Cp2020NrDatafort;

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
