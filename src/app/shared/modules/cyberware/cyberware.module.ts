import { CyberwareCardColumnComponent } from './cyberware-card-column/cyberware-card-column.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyberwareCardComponent } from './cyberware-card/cyberware-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CyberwareCardComponent, CyberwareCardColumnComponent],
  declarations: [CyberwareCardComponent, CyberwareCardColumnComponent]
})
export class CyberwareModule { }
