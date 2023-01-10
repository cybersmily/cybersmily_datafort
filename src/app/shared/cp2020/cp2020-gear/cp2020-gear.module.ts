import { DataListModule } from './../../modules/data-list/data-list.module';
import { Cp2020GearPdfService } from './services/cp2020-gear-pdf/cp2020-gear-pdf.service';
import { Cp2020GearDataService } from './services/cp2020-gear-data/cp2020-gear-data.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020GearListComponent } from './components/cp2020-gear-list/cp2020-gear-list.component';
import { PipesModule } from '../../pipes/pipes.module';
import { Cp2020GearEditorComponent } from './components/cp2020-gear-editor/cp2020-gear-editor.component';
import { Cp2020SourceGearListComponent } from './components/cp2020-source-gear-list/cp2020-source-gear-list.component';

@NgModule({
  declarations: [Cp2020GearListComponent, Cp2020GearEditorComponent,  Cp2020SourceGearListComponent],
  imports: [CommonModule, CommonUiModule, PipesModule, DataListModule],
  providers: [
    DataService,
    DiceService,
    Cp2020GearDataService,
    Cp2020GearPdfService,
  ],
  exports: [Cp2020GearListComponent, Cp2020GearEditorComponent, Cp2020SourceGearListComponent],
})
export class Cp2020GearModule {}
