import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
    selector: 'cs-image-holder',
    templateUrl: './image-holder.component.html',
    styleUrls: ['./image-holder.component.css'],
    standalone: false
})
export class ImageHolderComponent implements OnInit {
  faPlus = faPlus;

  @Input()
  image: string;

  @Input()
  maxHeight: number = 300;

  @Input()
  maxWidth: number = 300;

  @Output()
  update: EventEmitter<string> = new EventEmitter<string>();

  constructor(private imageCompress: NgxImageCompressService) {}

  ngOnInit(): void {
    if (isNaN(this.maxHeight)) {
      this.maxHeight = 300;
    }
    if (isNaN(this.maxWidth)) {
      this.maxWidth = 300;
    }
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress
        .compressFile(
          image,
          orientation,
          100,
          50,
          this.maxWidth,
          this.maxHeight
        ) // 50% ratio, 50% quality
        .then((compressedImage) => {
          this.update.emit(compressedImage);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}
