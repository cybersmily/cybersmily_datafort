import { Observable } from 'rxjs';
import { BodegasGeneratorService } from './../../shared/cpred/c-p-red-economy/services';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { BodegasItem } from '../../shared/cpred/c-p-red-economy/models';

@Component({
    selector: 'cs-bodegas-form',
    templateUrl: './bodegas-form.component.html',
    styleUrls: ['./bodegas-form.component.css'],
    standalone: false
})
export class BodegasFormComponent implements OnInit {
  faDice = faDice;

  bodegas$: Observable<BodegasItem>;

  constructor(private bodegasGenerator: BodegasGeneratorService) { }

  ngOnInit(): void {
  }

  generate() {

    this.bodegas$ = this.bodegasGenerator.generate();
  }
}
