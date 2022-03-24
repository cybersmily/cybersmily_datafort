import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  constructor() { }

  store<T>(key: string, obj: T) {
    if(typeof obj !== 'string') {
      window.localStorage.setItem(key, JSON.stringify(obj));
    } else {
      window.localStorage.setItem(key, obj);
    }
  }

  retrive<T>(key: string):T {
    if(window.localStorage && window.localStorage[key]){
      const obj = JSON.parse(localStorage.getItem(key));
      return obj as T;
    }
    return null;
  }
}
