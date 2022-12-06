import { Cp2020RandomWeaponSettingsService } from './../services/cp2020-random-weapon-settings/cp2020-random-weapon-settings.service';
import { RandomWeaponFilters } from './../models/random-weapon-filters';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-settings',
  templateUrl: './cp2020weapon-settings.component.html',
  styleUrls: ['./cp2020weapon-settings.component.css'],
})
export class Cp2020weaponSettingsComponent implements OnInit {
  constructor(private weaponSettings: Cp2020RandomWeaponSettingsService) {}

  wpnParam: RandomWeaponFilters = {};

  sections: Array<any> = [
    {
      name: 'Category',
      options: [
        { prop: 'category', name: 'PISTOLS', value: 'PISTOLS' },
        { prop: 'category', name: 'SMG', value: 'SMG' },
        { prop: 'category', name: 'RIFLES', value: 'RIFLES' },
        { prop: 'category', name: 'SHOTGUNS', value: 'SHOTGUNS' },
        { prop: 'category', name: 'MELEE', value: 'MELEE' },
        { prop: 'category', name: 'HEAVY WEAPONS', value: 'HEAVYWEAPONS' },
        { prop: 'category', name: 'EXOTICS', value: 'EXOTICS' },
      ],
    },
    {
      name: 'Subcategory',
      options: [
        { prop: 'subcategory', name: 'LIGHT (pistols, smgs)', value: 'LIGHT' },
        {
          prop: 'subcategory',
          name: 'MEDIUM (pistols, smgs)',
          value: 'MEDIUM',
        },
        {
          prop: 'subcategory',
          name: 'HEAVY (pistols, smgs)',
          value: 'HEAVY',
        },
        {
          prop: 'subcategory',
          name: 'VERY HEAVY (pistols)',
          value: 'VERY HEAVY',
        },
        { prop: 'subcategory', name: 'SNIPER (rifles)', value: 'SNIPER' },
        { prop: 'subcategory', name: 'ASSAULT (rifles)', value: 'ASSAULT' },
        { prop: 'subcategory', name: 'BOWS (exotics)', value: 'BOWS' },
        {
          prop: 'subcategory',
          name: 'CROSSBOWS (exotics)',
          value: 'CROSSBOWS',
        },
        { prop: 'subcategory', name: 'OTHER (rifles)', value: 'OTHER' },
        {
          prop: 'subcategory',
          name: ' BORG (rifles, pistols, smgs, melee, Hvy weapons)',
          value: 'Borg Weapon',
        },
      ],
    },
    {
      name: 'Weapon Type',
      options: [
        { prop: 'subcategory', name: 'P', value: 'P' },
        { prop: 'subcategory', name: 'SMG', value: 'SMG' },
        { prop: 'subcategory', name: 'RIF', value: 'RIF' },
        { prop: 'subcategory', name: 'SHT', value: 'SHT' },
        { prop: 'subcategory', name: 'MEL', value: 'MEL' },
        { prop: 'subcategory', name: 'HVY', value: 'HVY' },
        { prop: 'subcategory', name: 'EX', value: 'EX' },
      ],
    },
    {
      name: 'Availability',
      options: [
        { prop: 'avail', name: 'EXCELLENT', value: 'E' },
        { prop: 'avail', name: 'COMMON', value: 'C' },
        { prop: 'avail', name: 'POOR', value: 'P' },
        { prop: 'avail', name: 'RARE', value: 'R' },
      ],
    },
  ];

  ngOnInit(): void {
    this.weaponSettings.settings.subscribe((settings) => {
      this.wpnParam = settings;
    });
  }

  paramChecked(value: Array<string>, item: string): boolean {
    return (
      value &&
      value.some((t) => {
        return t === item;
      })
    );
  }

  addParam($event, type: string, value: string) {
    if (this.wpnParam[type]) {
      if ($event.target.checked) {
        this.wpnParam[type].push(value);
      } else {
        const i = this.wpnParam[type].findIndex((t) => t === value);
        this.wpnParam[type].splice(i, 1);
      }
    } else {
      this.wpnParam[type] = new Array<string>();
      this.wpnParam[type].push(value);
    }
    this.weaponSettings.setSettings(this.wpnParam);
  }
}
