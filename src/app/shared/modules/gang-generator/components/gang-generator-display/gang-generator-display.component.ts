import { GangPdfService } from './../../services/gang-pdf/gang-pdf.service';
import { faDice, faRedo, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Observable, first, map } from 'rxjs';
import { GangGeneratorService } from './../../services/gang-generator/gang-generator.service';
import { Component, OnInit } from '@angular/core';
import { CpGang } from '../../models';

@Component({
  selector: 'cs-gang-generator-display',
  templateUrl: './gang-generator-display.component.html',
  styleUrls: ['./gang-generator-display.component.css'],
})
export class GangGeneratorDisplayComponent implements OnInit {
  faDice = faDice;
  faRedo = faRedo;
  faFilePdf = faFilePdf;

  result$: Observable<Array<CpGang>>;
  gangList: Array<CpGang>;
  count: number = 1;

  constructor(
    private gangGenerator: GangGeneratorService,
    private gangPDFService: GangPdfService
  ) {}

  ngOnInit(): void {}

  generateGangs(): void {
    this.result$ = this.gangGenerator.generateGang(this.count).pipe(
      map((results) => {
        this.gangList = [...results];
        return results;
      })
    );
  }

  clear(): void {
    this.result$ = null;
  }

  savePDF(): void {
    this.gangPDFService.savePDF(this.gangList);
  }
}
