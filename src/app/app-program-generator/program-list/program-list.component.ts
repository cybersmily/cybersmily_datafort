import { ProgramListToPdf } from './../../shared/models/pdf/program-list-to-pdf';
import { FileLoaderService } from './../../shared/services/file-loader/file-loader.service';
import { SaveFileService } from './../../shared/services/save-file.service';
import { faTrash, faFilePdf, faSave, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NetRunProgram } from './../../shared/models/netrun';

@Component({
  selector: 'cs-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
  faTrash = faTrash;
  faFilePdf = faFilePdf;
  faSave = faSave;
  faUndo = faUndo;
  faUpload = faUpload;

  @Input()
  programList: Array<NetRunProgram> = new Array<NetRunProgram>();

  @Output()
  deleteProgram: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  selectProgram: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  resetList: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  uploadList: EventEmitter<Array<NetRunProgram>> = new EventEmitter<Array<NetRunProgram>>();

  constructor(private saveFile: SaveFileService,
    private file: FileLoaderService) { }

  ngOnInit(): void {
  }

  delete(index: number) {
    this.deleteProgram.emit(index);
  }

  select(index: number) {
    this.selectProgram.emit(index);
  }

  pdf() {
    const pdf: ProgramListToPdf = new ProgramListToPdf();
    pdf.generatePdf(this.programList);
  }

  save() {
    this.saveFile.SaveAsFile('Netrunner_Programs', JSON.stringify(this.programList), 'json');
  }

  upload($event) {
    const file = $event.target.files[0];
    if ( file.name.indexOf('.json') > 0 ) {
      this.file.importJSON(file)
      .subscribe( (data: Array<any>) =>  {
        console.log(data);
        const list = new Array<NetRunProgram>();
        data.forEach( p => {
          list.push( new NetRunProgram(p));
        });
        this.uploadList.emit(list);
      });
    } else {
      alert('Please choose a json file to upload');
    }
  }

  reset() {
    this.resetList.emit(true);
  }
}
