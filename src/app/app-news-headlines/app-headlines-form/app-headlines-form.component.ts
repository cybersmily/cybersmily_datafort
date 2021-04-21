import { HeadlinesToPDF } from './../../shared/models/pdf/headlines-to-pdf';
import { SaveFileService } from './../../shared/services/file-services/save-file.service';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { faDice, faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { DiceService } from './../../shared/services/dice/dice.service';
import { DataService } from './../../shared/services/file-services/data.service';
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

  headlines: Array<string> = new Array<string>();

  topics: Array<string> = new Array<string>();
  subjects: Array<string> = new Array<string>();
  verbs: Array<string> = new Array<string>();
  objects: Array<string> = new Array<string>();

  constructor(private dataService: DataService,
    private dice: DiceService,
    private saveFile: SaveFileService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CP_HEADLINES_JSON)
    .subscribe( data => {
      this.topics = data.topics;
      this.subjects = data.subjects;
      this.verbs = data.verbs;
      this.objects = data.objects;
    });
  }

  rollHeadlines() {
    let headline = '';
    let die = this.dice.generateNumber(0, this.topics.length - 1);
    headline += `${this.topics[die].toLocaleUpperCase()} - `;
    die = this.dice.generateNumber(0, this.subjects.length - 1);
    headline += `${this.subjects[die]} `;
    die = this.dice.generateNumber(0, this.verbs.length - 1);
    headline += `${this.verbs[die]} `;
    die = this.dice.generateNumber(0, this.objects.length - 1);
    headline += `${this.objects[die]}`;
    this.headlines.push(headline);
    this.headlines.sort((a,b) => a.localeCompare(b));
  }

  saveAsText() {
    let output = '';
    this.headlines.forEach( headline => {
      output += `${headline}\n`;
    });
    this.saveFile.SaveAsFile('Cyberpunk Headlines', output, '.txt');
  }

  saveAsPdf() {
    const pdf = new HeadlinesToPDF();
    pdf.generatePdf(this.headlines);
  }

}
