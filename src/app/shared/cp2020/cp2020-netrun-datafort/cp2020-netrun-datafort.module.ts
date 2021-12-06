import { Cp2020NetrunGearModule } from './../cp2020-netrun-gear/cp2020-netrun-gear.module';
import { PipesModule } from './../../pipes/pipes.module';
import { Cp2020DatafortSvgBuilderService } from './services/cp2020-datafort-svg-builder.service';
import { Cp2020DatafortBuilderService } from './services/cp2020-datafort-builder.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020DatafortFormComponent } from './cp2020-datafort-form/cp2020-datafort-form.component';
import { Cp2020DatafortEditorComponent } from './cp2020-datafort-editor/cp2020-datafort-editor.component';
import { Cp2020DatafortToolbarComponent } from './cp2020-datafort-toolbar/cp2020-datafort-toolbar.component';
import { Cp2020DatafortMapComponent } from './cp2020-datafort-map/cp2020-datafort-map.component';
import { NrNodeDisplayNamePipe } from './pipes/nr-node-display-name/nr-node-display-name.pipe';



@NgModule({
  declarations: [
    Cp2020DatafortFormComponent,
    Cp2020DatafortEditorComponent,
    Cp2020DatafortToolbarComponent,
    Cp2020DatafortMapComponent,
    NrNodeDisplayNamePipe
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule,
    Cp2020NetrunGearModule
  ],
  providers: [
    DiceService,
    DataService,
    Cp2020DatafortBuilderService,
    Cp2020DatafortSvgBuilderService
  ],
  exports: [
    Cp2020DatafortFormComponent,
    Cp2020DatafortEditorComponent,
    Cp2020DatafortToolbarComponent,
    Cp2020DatafortMapComponent,
    NrNodeDisplayNamePipe
  ]
})
export class Cp2020NetrunDatafortModule { }
