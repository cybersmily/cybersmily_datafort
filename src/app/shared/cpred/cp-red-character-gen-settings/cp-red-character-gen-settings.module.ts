import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedCharacterGenSettingFormComponent } from './components/cp-red-character-gen-setting-form/cp-red-character-gen-setting-form.component';
import { CpRedCharacterGenSettingStatFormComponent } from './components/cp-red-character-gen-setting-stat-form/cp-red-character-gen-setting-stat-form.component';



@NgModule({
  declarations: [
    CpRedCharacterGenSettingFormComponent,
    CpRedCharacterGenSettingStatFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CpRedCharacterGenSettingsModule { }
