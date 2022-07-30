import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedWeaponsDisplayComponent } from './components/cp-red-weapons-display/cp-red-weapons-display.component';
import { CpRedWeaponDisplayComponent } from './components/cp-red-weapon-display/cp-red-weapon-display.component';
import { CpRedWeaponEditorComponent } from './components/cp-red-weapon-editor/cp-red-weapon-editor.component';

@NgModule({
  declarations: [CpRedWeaponsDisplayComponent, CpRedWeaponDisplayComponent, CpRedWeaponEditorComponent],
  exports: [CpRedWeaponsDisplayComponent],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedWeaponsModule {}
