import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileLoaderService {
  constructor() {}

  public importJSON(inputFile): Observable<any> {
    const fileReader = new FileReader();

    // init read
    fileReader.readAsText(inputFile);

    return new Observable((observer: Subscriber<any>) => {
      // if success
      fileReader.onload = (ev: ProgressEvent): void => {
        observer.next(JSON.parse(fileReader.result.toString()));
        observer.complete();
      };
      // if failed
      fileReader.onerror = (error: any): void => {
        observer.error(error);
      };
    });
  }
}
