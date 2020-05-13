import { Directive, EventEmitter, HostListener, HostBinding, Output, Input } from '@angular/core';

@Directive({
  selector: '[csLongpress]'
})
export class LongpressDirective {
  pressing: boolean;
  longPressing: boolean;
  timeout: any;
  interval: any;
  @Input()
  stopInterval = false;

  @Output()
  onLongPress = new EventEmitter();

  @Output()
  onLongPressing = new EventEmitter();

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('mouseup', ['$event'])
  endPress(event) {
    console.log('EndLongPress');
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.longPressing = false;
    this.pressing = false;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    console.log('mousedown');
    this.stopInterval = false;
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);
      this.interval = setInterval(() => {
        this.onLongPressing.emit(event);
        console.log(this.stopInterval);
        if (this.stopInterval ) {
          this.endPress(event);
        }
      }, 100);
    }, 500);
  }

}
