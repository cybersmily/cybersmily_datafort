import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { svgAsPngUri } from 'save-svg-as-png';

@Injectable({
  providedIn: 'root',
})
export class SaveFileService {
  constructor() {}

  SaveAsFile(fileName: string, data: any, extension?: string) {
    const fileData = typeof data == 'string' ? data : JSON.stringify(data);
    const ext = extension ? extension.replace(/\./g, '') : 'txt';
    const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${fileName}.${ext}`);
  }

  SaveAsPng(fileName: string, data: any) {
    // saveSvgAsPng(data, fileName);
    svgAsPngUri(data, {}).then((uri) => {
      saveAs(uri, fileName);
    });
  }
}
