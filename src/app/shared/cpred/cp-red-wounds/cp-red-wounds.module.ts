import { CpRedInjuryEditorComponent } from './components/cp-red-injury-editor/cp-red-injury-editor.component';
import { CpRedAddictionEditorComponent } from './components/cp-red-addiction-editor/cp-red-addiction-editor.component';
import { CpRedWoundsPdfService } from './services/cp-red-wounds-pdf/cp-red-wounds-pdf.service';
import { CpRedWoundsManagerService } from './services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedWoundsDisplayComponent } from './components/cp-red-wounds-display/cp-red-wounds-display.component';
import { CpRedInjuriesDisplayComponent } from './components/cp-red-injuries-display/cp-red-injuries-display.component';
import { CpRedAddictionsDisplayComponent } from './components/cp-red-addictions-display/cp-red-addictions-display.component';

@NgModule({
  declarations: [
    CpRedWoundsDisplayComponent,
    CpRedInjuriesDisplayComponent,
    CpRedAddictionsDisplayComponent,
    CpRedAddictionEditorComponent,
    CpRedInjuryEditorComponent,
  ],
  exports: [
    CpRedWoundsDisplayComponent,
    CpRedInjuriesDisplayComponent,
    CpRedAddictionsDisplayComponent,
    CpRedAddictionEditorComponent,
    CpRedInjuryEditorComponent,
  ],
  providers: [CpRedWoundsManagerService, CpRedWoundsPdfService],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedWoundsModule {}
