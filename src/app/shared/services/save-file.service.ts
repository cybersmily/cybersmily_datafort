import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {

  constructor() { }

  SaveAsFile( fileName: string, data: string, extension?: string) {
    const ext = (extension) ? extension : 'txt';
    const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, fileName + '.' + ext);
  }
}
