import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedRoleDisplayComponent } from './components/cp-red-role-display/cp-red-role-display.component';
import { CpRedRoleEditorComponent } from './components/cp-red-role-editor/cp-red-role-editor.component';



@NgModule({
  declarations: [
    CpRedRoleDisplayComponent,
    CpRedRoleEditorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CpRedRolesModule { }
