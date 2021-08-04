import { WeaponcardcolumnComponent } from './weaponcardcolumn/weaponcardcolumn.component';
import { WeaponcardComponent } from './weaponcard/weaponcard.component';
import { DiceService } from './../../services/dice/dice.service';
import { PipesModule } from './../../pipes/pipes.module';
import { Cp2020weaponComponent } from './cp2020weapon/cp2020weapon.component';
import { Cp2020weapontableComponent } from './cp2020weapontable/cp2020weapontable.component';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020weaponEditorComponent } from './cp2020weapon-editor/cp2020weapon-editor.component';
import { Cp2020weaponSelectorComponent } from './cp2020weapon-selector/cp2020weapon-selector.component';
import { Cp2020weaponCalculatorComponent } from './cp2020weapon-calculator/cp2020weapon-calculator.component';
import { MartialArtsDataService } from '../../services/data/martial-arts-data.service';
import { IUCombatActionsComponent } from './i-u-combat-actions/i-u-combat-actions.component';
import { Cp2020ammoComponent } from './cp2020ammo/cp2020ammo.component';
import { Cp2020weaponOptionsComponent } from './cp2020weapon-options/cp2020weapon-options.component';



@NgModule({
  declarations: [
    Cp2020weapontableComponent,
    Cp2020weaponComponent,
    Cp2020weaponEditorComponent,
    Cp2020weaponSelectorComponent,
    Cp2020weaponCalculatorComponent,
    WeaponcardComponent,
    WeaponcardcolumnComponent,
    IUCombatActionsComponent,
    Cp2020ammoComponent,
    Cp2020weaponOptionsComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    DiceService,
    MartialArtsDataService
  ],
  exports: [
    Cp2020weapontableComponent,
    Cp2020weaponComponent,
    Cp2020weaponCalculatorComponent,
    WeaponcardComponent,
    WeaponcardcolumnComponent,
    IUCombatActionsComponent,
    Cp2020weaponOptionsComponent
  ]
})
export class Cp2020weaponsModule { }
