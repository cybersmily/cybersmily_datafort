import { faDice } from '@fortawesome/free-solid-svg-icons';
import { LifepathEthnicity, LifepathEthnicityEntry } from '../../shared/cp2020/cp2020-lifepath/models';
import { EthnicityGeneratorService } from './../../shared/cp2020/cp2020-lifepath/services';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-lifepath-ethnicity',
  templateUrl: './lifepath-ethnicity.component.html',
  styleUrls: ['./lifepath-ethnicity.component.css']
})
export class LifepathEthnicityComponent implements OnInit, OnChanges {
  faDice = faDice;

  @Input()
  lifepathSource: string;

  @Output()
  valueChange = new EventEmitter();

  chartData: LifepathEthnicityEntry[];
  selectedEthnicityOne: LifepathEthnicityEntry;
  selectedEthnicityTwo: LifepathEthnicityEntry;
  selectedLanguageOne: string;
  selectedLanguageTwo: string;
  isPolygot = false;

  constructor(private ethnicityService: EthnicityGeneratorService) {}

  ngOnChanges(change) {
    this.ethnicityService
    .GetChart(this.lifepathSource)
    .subscribe( data => {
      this.chartData = data;
    }
    );

  }

  ngOnInit() {
    this.selectedEthnicityOne = {name: '', languages: []};
    this.selectedEthnicityTwo = {name: '', languages: []};
  }

  generateRandom() {
    this.ethnicityService
    .GenerateEthnicity(this.lifepathSource).subscribe(
      data => {
        this.selectedEthnicityOne = this.getEthnicity(data[0].name);
        this.selectedLanguageOne = data[0].language;
        this.isPolygot = false;
        if (data.length > 1) {
          this.isPolygot = true;
          this.selectedEthnicityTwo = this.getEthnicity(data[1].name);
          this.selectedLanguageTwo = data[1].language;
        }
        this.emitEthnicity();
    });
  }

  getEthnicity(name: string): LifepathEthnicityEntry {
    const eth = this.chartData.find( e => e.name === name);
    return eth;
  }

  onSelectEthnicity(event: any) {
    this.emitEthnicity();
  }

  emitEthnicity() {
    const ethnicity: LifepathEthnicity = {name: '', language: ''};
    ethnicity.name = (this.selectedEthnicityOne.name) ? this.selectedEthnicityOne.name : '';
    ethnicity.language = (this.selectedLanguageOne) ? this.selectedLanguageOne : '';
    if (this.isPolygot) {
      ethnicity.name += '/' + this.selectedEthnicityTwo.name;
      ethnicity.language += '/' + this.selectedLanguageTwo;
    }
    this.valueChange.emit(ethnicity);
  }
}
