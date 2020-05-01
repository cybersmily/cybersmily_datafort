import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-app-character-image',
  templateUrl: './app-character-image.component.html',
  styleUrls: ['./app-character-image.component.css']
})
export class AppCharacterImageComponent implements OnInit {

  @Input()
  image = '';

  @Output()
  changeImage = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  get hasImage(): boolean {
    return (this.image !== '');
  }

  onChangeImage() {
    const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
    if (imageReg.test(this.image) ) {
      this.changeImage.emit(this.image);
    } else {
      alert('This link you attempted to enter isn\'t a url to image file.' +
      ' Please use an image url that ends in gif, jpg, jpeg, tiff, or png. Thanks!');
      this.image = '';
    }
  }
}
