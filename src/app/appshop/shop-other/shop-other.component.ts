import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'cs-shop-other',
  templateUrl: './shop-other.component.html',
  styleUrls: ['./shop-other.component.css']
})
export class ShopOtherComponent implements OnInit {
  otherList: string[];
  title: string;
  updated: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getOtherExpenses();
  }
  private getOtherExpenses(): void {
    this.dataService
      .GetJson('/json/shop/shopother.json')
      .subscribe(
        resultObj => {
          this.title = resultObj.title;
          this.updated = resultObj.updated;
          this.otherList = resultObj.items;
        },
        error => console.log( 'Error :: ' + error)
      );
  }
}
