import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020RoleSectionComponent } from './cp2020-role-section/cp2020-role-section.component';
import { Cp2020RoleEditorComponent } from './cp2020-role-editor/cp2020-role-editor.component';



@NgModule({
  declarations: [
    Cp2020RoleSectionComponent,
    Cp2020RoleEditorComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DiceService,
    DataService
  ],
  exports: [
    Cp2020RoleSectionComponent,
    Cp2020RoleEditorComponent
  ]
})
export class Cp2020RoleModule { }
