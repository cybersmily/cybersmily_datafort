import { CommonUiModule } from './../common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpcCardComponent } from './npc-card/npc-card.component';
import { NpcCardColumnComponent } from './npc-card-column/npc-card-column.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule
  ],
  exports: [ NpcCardComponent, NpcCardColumnComponent],
  declarations: [NpcCardComponent, NpcCardColumnComponent]
})
export class NpcsModule { }
