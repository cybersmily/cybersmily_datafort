import { DataService } from './../../services/file-services/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020LifestyleComponent } from './cp2020-lifestyle/cp2020-lifestyle.component';
import { Cp2020HousingListComponent } from './cp2020-housing-list/cp2020-housing-list.component';
import { Cp2020ExpenseListComponent } from './cp2020-expense-list/cp2020-expense-list.component';
import { Cp2020ServiceListComponent } from './cp2020-service-list/cp2020-service-list.component';
import { Cp2020IdentityListComponent } from './cp2020-identity-list/cp2020-identity-list.component';
import { Cp2020FoodListComponent } from './cp2020-food-list/cp2020-food-list.component';



@NgModule({
  declarations: [Cp2020LifestyleComponent, Cp2020HousingListComponent, Cp2020ExpenseListComponent, Cp2020ServiceListComponent, Cp2020IdentityListComponent, Cp2020FoodListComponent],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DataService
  ],
  exports: [
    Cp2020LifestyleComponent
  ]
})
export class Cp2020LifestyleModule { }
