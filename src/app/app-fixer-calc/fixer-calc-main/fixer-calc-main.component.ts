import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { FixerCharts } from './../../shared/cp2020/cp2020-fixerCalc/fixerchart';

@Component({
  selector: 'cs-fixer-calc-main',
  templateUrl: './fixer-calc-main.component.html',
  styleUrls: ['./fixer-calc-main.component.css']
})
export class FixerCalcMainComponent implements OnInit {

  fixerCharts:FixerCharts;
  areaList: Array<string> = new Array<string>();
  contactList: Array<string> = new Array<string>();

  constructor(private seo: SeoService, private dataService: DataService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Fixer Calculator',
      '2020-07, Cybersmily\'s Datafort Cyberpunk 2020 Fixer Calculator is an application to generate a Fixer character contacts using the Wildside supplement.'
    );

    this.dataService.GetJson(JsonDataFiles.CP2020_FIXER_CONTACTS_JSON)
    .subscribe( (data:FixerCharts) => {
      this.areaList = new Array<string>();
      this.contactList = new Array<string>();
      data.fields.forEach( area => {
        for(let i = 0; i < area.weight; i++){
          this.areaList.push(area.value);
        }
      });
      data.types.forEach( type => {
        for(let i = 0; i < type.weight; i++){
          this.contactList.push(type.value);
        }
      });

    });


  }

}
