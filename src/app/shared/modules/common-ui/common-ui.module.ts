import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule,
          CollapseModule,
          TooltipModule,
          ModalModule,
          AccordionModule,
          TabsModule,
          PopoverModule
        } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    AccordionModule.forRoot(),
    BsDropdownModule,
    CollapseModule.forRoot(),
    ModalModule,
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    AccordionModule,
    BsDropdownModule,
    CollapseModule,
    ModalModule,
    PopoverModule,
    TabsModule,
    TooltipModule,
    FontAwesomeModule
  ]
})
export class CommonUiModule { }
