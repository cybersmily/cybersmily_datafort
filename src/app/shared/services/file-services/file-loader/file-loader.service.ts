import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileLoaderService {

  constructor() {}

  public importJSON<T>(inputFile): Observable<T> {
    const fileReader = new FileReader();

    // init read
    fileReader.readAsText(inputFile);

    return new Observable<T>((observer: Subscriber<any>) => {
      // if success
      fileReader.onload = (ev: ProgressEvent): void => {
        observer.next(JSON.parse(fileReader.result.toString()) as T);
        observer.complete();
      };
      fileReader.onabort = (event: any): void => {
        console.trace('Abort in FileLoaderService', event);
        observer.error(event);
      };
    });
  }
}
