import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedGearDisplayComponent } from './components/cp-red-gear-display/cp-red-gear-display.component';
import { CpRedFashionDisplayComponent } from './components/cp-red-fashion-display/cp-red-fashion-display.component';
import { CpRedHousingDisplayComponent } from './components/cp-red-housing-display/cp-red-housing-display.component';

@NgModule({
  declarations: [
    CpRedGearDisplayComponent,
    CpRedFashionDisplayComponent,
    CpRedHousingDisplayComponent,
  ],
  exports: [
    CpRedGearDisplayComponent,
    CpRedFashionDisplayComponent,
    CpRedHousingDisplayComponent,
  ],
  imports: [CommonModule, CommonUiModule],
})
export class CpRedGearModule {}
