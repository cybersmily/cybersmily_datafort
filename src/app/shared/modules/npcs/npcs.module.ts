import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpcCardComponent } from './npc-card/npc-card.component';
import { NpcCardColumnComponent } from './npc-card-column/npc-card-column.component';
import { NpcProfileModalComponent } from './npcProfileModal/npcprofilemodal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [BsModalService],
  exports: [ NpcCardComponent, NpcCardColumnComponent],
  declarations: [NpcCardComponent, NpcCardColumnComponent]
})
export class NpcsModule { }
