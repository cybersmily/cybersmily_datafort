import { GangPdfService } from './../../services/gang-pdf/gang-pdf.service';
import { faDice, faRedo, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Observable, first } from 'rxjs';
import { GangGeneratorService } from './../../services/gang-generator/gang-generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-gang-generator-display',
  templateUrl: './gang-generator-display.component.html',
  styleUrls: ['./gang-generator-display.component.css'],
})
export class GangGeneratorDisplayComponent implements OnInit {
  faDice = faDice;
  faRedo = faRedo;
  faFilePdf = faFilePdf;

  result$: Observable<any>;
  count: number = 1;

  constructor(
    private gangGenerator: GangGeneratorService,
    private gangPDFService: GangPdfService
  ) {}

  ngOnInit(): void {}

  generateGangs(): void {
    this.result$ = this.gangGenerator.generateGang(this.count);
  }

  clear(): void {
    this.result$ = null;
  }

  savePDF(): void {
    this.result$
      .pipe(first())
      .subscribe((gangList) => this.gangPDFService.savePDF(gangList));
  }
}
