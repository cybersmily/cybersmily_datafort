import { DataService } from './../../services/file-services/dataservice/data.service';
import { CommonUiModule } from './../common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageHolderComponent } from './image-holder/image-holder.component';

@NgModule({
  declarations: [ImageHolderComponent],
  providers: [DataService],
  imports: [CommonModule, CommonUiModule],
  exports: [ImageHolderComponent],
})
export class ImageHolderModule {}
