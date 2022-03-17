import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NightMarketGeneratorService } from './../../shared/cpred/c-p-red-economy/services/night-market-generator.service';
import { MarketsToPDF } from './../../shared/cpred/c-p-red-economy/models/marketsToPDF';
import { faDice, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NightMarketListing, NightMarketCategory } from '../../shared/cpred/c-p-red-economy/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-night-market-form',
  templateUrl: './night-market-form.component.html',
  styleUrls: ['./night-market-form.component.css']
})
export class NightMarketFormComponent implements OnInit {
  faDice = faDice;
  faFilePdf = faFilePdf;

  randomRollNoItems: boolean = true;
  numberOfItems: number = 5;
  itemList$: Observable<Array<NightMarketListing>>;
  private _itemList = Array<NightMarketListing>();

  constructor(private nightMarketGeneratorService: NightMarketGeneratorService) { }

  ngOnInit(): void {
  }

  generate() {
    this.itemList$ = this.nightMarketGeneratorService
    .generate(this.randomRollNoItems? null : this.numberOfItems)
    .pipe(
      map( data => {
        this._itemList = data;
        return data;
      })
    );
  }

  saveAsPDF() {
    MarketsToPDF.createNighMarketPDF(this._itemList);
  }

}
