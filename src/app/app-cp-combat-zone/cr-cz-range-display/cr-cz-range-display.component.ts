import { Component,input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cr-cz-range-display',
  standalone: false,
  templateUrl: './cr-cz-range-display.component.html',
  styleUrl: './cr-cz-range-display.component.css'
})
export class CrCzRangeDisplayComponent implements OnInit {
  ranges = input<Array<string>>([]);
  classNames = input<string>();
  left = input<string>();
  top = input<string>();

  classes:string = '';
  styles: any = {};

  ngOnInit(): void {
    this.classes = `${this.classNames() || ''}  cz-range`;
    this.styles = {'left': this.left(),'top':this.top()};
    console.log('classes')
  }

}
