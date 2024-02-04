import { Cp2020RandomWeaponSettingsService } from './../services/cp2020-random-weapon-settings/cp2020-random-weapon-settings.service';
import { RandomWeaponFilters,RandomWeaponSettings  } from './../models/random-weapon-filters';
import { Component, OnInit } from '@angular/core';
import { select } from '@ngrx/store';

@Component({
  selector: 'cs-cp2020weapon-settings',
  templateUrl: './cp2020weapon-settings.component.html',
  styleUrls: ['./cp2020weapon-settings.component.css'],
})
export class Cp2020weaponSettingsComponent implements OnInit {
  constructor(private weaponSettings: Cp2020RandomWeaponSettingsService) { }

  wpnSettings: RandomWeaponSettings = {
    count: 0,
    filters: {}
  };

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
      name: 'Type',
      options: [
        { prop: 'type', name: 'P', value: 'P' },
        { prop: 'type', name: 'SMG', value: 'SMG' },
        { prop: 'type', name: 'RIF', value: 'RIF' },
        { prop: 'type', name: 'SHT', value: 'SHT' },
        { prop: 'type', name: 'MEL', value: 'MEL' },
        { prop: 'type', name: 'HVY', value: 'HVY' },
        { prop: 'type', name: 'EX', value: 'EX' },
      ],
    },
    {
      name: 'Availability',
      options: [
        { prop: 'availability', name: 'EXCELLENT', value: 'E' },
        { prop: 'availability', name: 'COMMON', value: 'C' },
        { prop: 'availability', name: 'POOR', value: 'P' },
        { prop: 'availability', name: 'RARE', value: 'R' },
      ],
    },
  ];

  ngOnInit(): void {
    this.weaponSettings.settings.subscribe((settings) => {
      this.wpnSettings = settings;
    });
  }

  paramChecked(prop: string, item: string): boolean {
    return (
      this.wpnSettings.filters[prop] &&
      this.wpnSettings.filters[prop].includes(item)
    );
  }

  updateSettings() {
    this.weaponSettings.setSettings(this.wpnSettings);
  }

  toggleAll($event, section: string) {
    const selected = this.sections.find(sect => sect.name === section);
    if ($event.target.checked) {
      selected?.options.forEach(opt => {
        this.addParam(opt.prop, opt.value)
      });

    } else {
      selected?.options.forEach(opt => {
        this.removeParam(opt.prop, opt.value);
      });
    }
    this.updateSettings();
  }

  allChecked(section: string): boolean {
    const selected = this.sections.find(sect => sect.name === section)?.options.length;
    const params = this.wpnSettings.filters[section.toLowerCase()]?.length;
    return params > 0 && selected === params;
  }

  toggleParam($event, type: string, value: string) {
    if ($event.target.checked) {
      this.addParam(type, value);
    } else {
      this.removeParam(type, value);
    }
    this.updateSettings();
    $event.stopPropagation();
  }

  addParam(type: string, value: string) {
    if (!this.wpnSettings.filters[type]) {
      this.wpnSettings.filters[type] = new Array<string>();
    }
    if(!this.wpnSettings.filters[type].includes(value)) {
      this.wpnSettings.filters[type].push(value);
    }
  }

  removeParam(type: string, value): void {
    const i = this.wpnSettings.filters[type].findIndex((t) => t === value);
    this.wpnSettings.filters[type].splice(i, 1);
  }
}
