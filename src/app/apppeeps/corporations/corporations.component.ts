import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-corporations',
  templateUrl: './corporations.component.html',
  styleUrls: ['./corporations.component.css']
})
export class CorporationsComponent implements OnInit {

  coporations: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetJson('/json/peeps/corporations.json').subscribe( data => {
      this.coporations = data.corporations;
    });
  }

}
