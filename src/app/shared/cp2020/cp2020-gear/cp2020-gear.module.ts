import { Cp2020GearPdfService } from './services/cp2020-gear-pdf/cp2020-gear-pdf.service';
import { Cp2020GearDataService } from './services/cp2020-gear-data/cp2020-gear-data.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020GearListComponent } from './components/cp2020-gear-list/cp2020-gear-list.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [Cp2020GearListComponent],
  imports: [CommonModule, CommonUiModule, PipesModule],
  providers: [
    DataService,
    DiceService,
    Cp2020GearDataService,
    Cp2020GearPdfService,
  ],
  exports: [Cp2020GearListComponent],
})
export class Cp2020GearModule {}
