import { VenditGeneratorService } from './../../shared/cpred/c-p-red-economy/services/vendit-generator.service';
import { Observable } from 'rxjs';
import { VenditItem } from './../../shared/cpred/c-p-red-economy/models/vendit-item';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { VenditChart } from './../../shared/cpred/c-p-red-economy/models/vendit-chart';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-vendit-form',
    templateUrl: './vendit-form.component.html',
    styleUrls: ['./vendit-form.component.css'],
    standalone: false
})
export class VenditFormComponent implements OnInit {
  faDice = faDice;

  vendits$: Observable<Array<VenditItem>>;
  numOfVendits = 1;

  constructor(private venditGenerator: VenditGeneratorService) { }

  ngOnInit(): void {
  }

  generate() {
    this.vendits$ = this.venditGenerator.generate(this.numOfVendits);
  }

}
