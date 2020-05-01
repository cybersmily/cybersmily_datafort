import {
  Directive,
  Output,
  Input,
  HostBinding,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[csLongpress]'
})
export class LongpressDirective {
  pressing: boolean;
  longPressing: boolean;
  timeout: any;
  interval: any;

  @Output()
  onLongPress = new EventEmitter();

  @Output()
  onLongPressing = new EventEmitter();

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.onLongPress.emit(event);
      this.interval = setInterval(() => {
        this.onLongPressing.emit(event);
      }, 50);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.longPressing = false;
    this.pressing = false;
  }
}
