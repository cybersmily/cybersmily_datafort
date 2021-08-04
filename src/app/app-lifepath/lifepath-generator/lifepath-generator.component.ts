import { faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { SaveFileService } from './../../shared/services/file-services';
import { LifepathData, LifepathSource, LifepathChart, LifePathResults,
  LifepathChartSelection, LifepathFamily, LifepathEventsList, LifepathEthnicity } from '../../shared/cp2020/cp2020-lifepath/models';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-lifepath-generator',
  templateUrl: './lifepath-generator.component.html',
  styleUrls: ['./lifepath-generator.component.css']
})
export class LifepathGeneratorComponent implements OnInit {
  faFile = faFile;
  faFilePdf = faFilePdf;

  sourceList: LifepathSource[];
  motivationList: LifepathChart[];
  appearanceList: LifepathChart[];
  familyData: any;
  lifeEvents: any;
  lifepathResults: LifePathResults;

  selectedSource: string;

  constructor(private dataService: DataService,
      private saveFileService: SaveFileService,
      private seo: SeoService) {
    this.appearanceList = new Array<LifepathChart>();
    this.motivationList = new Array<LifepathChart>();
    this.sourceList = new Array<LifepathSource>();
    this.selectedSource = 'CP2020';
    this.lifepathResults = new LifePathResults();
  }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Lifepath',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Lifepath is an application to generate a character\'s lifepath.'
    );
    // load data
    this.getLifepathData();
  }

  getLifepathData() {
    this.dataService
    .GetJson(JsonDataFiles.CP2020_LIFEPATH_JSON)
    .subscribe(
      resultObj => {
        this.parseLifepathData(resultObj);
      },
      error => console.log( 'Error :: ' + error)
    );
  }

  parseLifepathData(results: LifepathData) {
    // parse data for sources
    this.sourceList = results.sources;
    // parse data for Appearance charts
    this.appearanceList = results.appearance;
    // parse data for Motivation charts
    this.motivationList = results.motivations;
    // parse data for Family charts
    this.familyData = results.family;
    // parse data for Life Events
    this.lifeEvents = results.lifeevents;
  }

  onChartChange(value: LifepathChartSelection) {
    this.lifepathResults[value.chart][value.title] = value.value;
  }

  onFamilyGeneration( value: LifepathFamily) {
    this.lifepathResults.family = value;
  }

  onLifeEventGeneration(value: LifepathEventsList) {
    this.lifepathResults.events = value.Events.slice(0);
  }

  onEthnicityGeneration(value: LifepathEthnicity) {
    this.lifepathResults.ethnicity = value;
  }

  saveFile() {
    this.saveFileService.SaveAsFile('CP2020LifePath', this.lifepathResults.print());
  }
}
