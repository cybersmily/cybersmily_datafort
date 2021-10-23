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

  headlines: Array<string> = new Array<string>();

  numOfHeadlines: number = 1;

  topics: Array<string> = new Array<string>();
  subjects: Array<Array<string>> = new Array<Array<string>>();
  verbs: Array<Array<string>> = new Array<Array<string>>();

  constructor(private dataService: DataService,
    private dice: DiceService,
    private saveFile: SaveFileService) { }

  ngOnInit(): void {
    this.dataService.GetJson(JsonDataFiles.CP_HEADLINES_JSON)
    .subscribe( data => {
      this.topics = data.topics;
      this.subjects = data.subjects;
      this.verbs = data.verbs;
    });
  }

  rollHeadlines() {
    for(let i = 0; i < this.numOfHeadlines; i++) {
      this.headlines.push(this.generateHeadline());
    }
    this.headlines.sort((a,b) => a.localeCompare(b));
  }

  private generateHeadline(): string {
    let die = this.dice.generateNumber(0, this.topics.length - 1);
    const topic = this.topics[die].toLocaleUpperCase();

    let num = this.dice.generateNumber(0, 1);
    const subject = this.generateSubject(num);

    die = this.dice.generateNumber(0, this.verbs.length - 1);
    const verb = this.verbs[die][num];

    num = this.dice.generateNumber(0, 1);
    const objective = this.generateSubject(num);

    return `${topic} - ${subject} ${verb} ${objective}`;
  }

  private generateSubject(num: number): string {
    let result = '';
    do {
      const die = this.dice.generateNumber(0, this.subjects.length - 1);
      result = this.subjects[die][num];
    } while(result === '');
    return result;
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

  clear() {
    this.headlines = new Array<string>();
  }

}
