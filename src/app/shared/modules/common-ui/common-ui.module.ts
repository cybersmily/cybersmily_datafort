import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgModule } from '@angular/core';
import { CsdComboBoxComponent } from './csd-combo-box/csd-combo-box.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { AngularDraggableModule } from 'angular2-draggable';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
  declarations: [CsdComboBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxMasonryModule,
    DndModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule,
    PopoverModule.forRoot(),
    SortableModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    AngularDraggableModule,
    FontAwesomeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    NgxMasonryModule,
    DndModule,
    BsDropdownModule,
    CollapseModule,
    ModalModule,
    PopoverModule,
    SortableModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule,
    FontAwesomeModule,
    AngularDraggableModule,
    CsdComboBoxComponent,
  ],
  providers: [BsModalService, BsModalRef],
})
export class CommonUiModule {}
