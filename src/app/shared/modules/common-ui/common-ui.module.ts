import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  ],
  providers: [
    BsModalService,
    BsModalRef
  ]
})
export class CommonUiModule { }
