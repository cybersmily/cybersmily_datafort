import { RandomWeaponFilters } from './../../models/random-weapon-filters';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020RandomWeaponSettingsService {
  _settings: RandomWeaponFilters;

  constructor() {}
}
