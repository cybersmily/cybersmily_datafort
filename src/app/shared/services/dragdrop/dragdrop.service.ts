import { CsDragObject } from './models/cs-drag-object';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragdropService<T> {
  private _dragItem: BehaviorSubject<CsDragObject<T>> = new BehaviorSubject<CsDragObject<T>>(null);
  dragItem: Observable<CsDragObject<T>> = this._dragItem.asObservable();

  constructor() { }

  setItem(item: CsDragObject<T>): void {
    this._dragItem.next(item);
  }

  setType(type: string): void {
    const item = this._dragItem.getValue();
    item.type = type;
    this._dragItem.next(item);
  }

  canDropType(type: string): Observable<boolean> {
    return of(this._dragItem.getValue()?.type === type);
  }
}
