import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { saveSvgAsPng, svgAsPngUri } from 'save-svg-as-png';

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

  SaveAsPng( fileName: string, data: any) {
    // saveSvgAsPng(data, fileName);
    svgAsPngUri(data, {}).then( uri => {
      saveAs(uri, fileName);
    });
  }
}
