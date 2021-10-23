import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  constructor() { }

  store<T>(key: string, obj: T) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  retrive<T>(key: string):T {
    return JSON.parse(localStorage.getItem(key));
  }
}
