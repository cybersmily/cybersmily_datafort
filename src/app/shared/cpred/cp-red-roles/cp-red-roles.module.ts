import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedRoleDisplayComponent } from './components/cp-red-role-display/cp-red-role-display.component';
import { CpRedRoleEditorComponent } from './components/cp-red-role-editor/cp-red-role-editor.component';
import { CpRedRolesDisplayComponent } from './components/cp-red-roles-display/cp-red-roles-display.component';

@NgModule({
  declarations: [
    CpRedRoleDisplayComponent,
    CpRedRoleEditorComponent,
    CpRedRolesDisplayComponent,
  ],
  exports: [
    CpRedRoleDisplayComponent,
    CpRedRoleEditorComponent,
    CpRedRolesDisplayComponent,
  ],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedRolesModule {}
