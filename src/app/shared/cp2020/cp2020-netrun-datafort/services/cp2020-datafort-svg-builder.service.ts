import { Cp2020NrDatafort } from './../models/cp2020-nr-datafort';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020DatafortSvgBuilderService {

  constructor() { }

  generate(datafort: Cp2020NrDatafort): string {
    return '';
  }
}
