import { Observable } from 'rxjs';
import { CPHeadlinesGeneratorService } from './../../shared/services/c-p-headlines-generator/c-p-headlines-generator.service';
import { HeadlinesToPDF } from './../../shared/models/pdf/headlines-to-pdf';
import { faDice, faFile, faFilePdf, faRedo } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService, SaveFileService, JsonDataFiles } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-app-headlines-form',
  templateUrl: './app-headlines-form.component.html',
  styleUrls: ['./app-headlines-form.component.css']
})
export class AppHeadlinesFormComponent implements OnInit {
  faDice = faDice;
  faFile = faFile;
  faFilePdf = faFilePdf;
  faRedo = faRedo;

  headlines$: Observable<Array<string>>;

  numOfHeadlines: number = 1;

  constructor(private headlinesGenerator: CPHeadlinesGeneratorService,
    private saveFile: SaveFileService) { }

  ngOnInit(): void {
    this.headlines$ = this.headlinesGenerator.headlines;
  }

  rollHeadlines() {
    this.headlinesGenerator.generate(this.numOfHeadlines);
  }

  saveAsText() {
    let output = '';
    this.headlinesGenerator.getList().forEach( headline => {
      output += `${headline}\n`;
    });
    this.saveFile.SaveAsFile('Cyberpunk Headlines', output, '.txt');
  }

  saveAsPdf() {
    const pdf = new HeadlinesToPDF();
    pdf.generatePdf(this.headlinesGenerator.getList());
  }

  clear() {
    this.headlinesGenerator.clear();
  }

}
