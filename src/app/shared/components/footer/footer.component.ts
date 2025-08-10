import { Component, OnInit } from '@angular/core';
import { CommonUiModule } from '../../modules/common-ui/common-ui.module';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    imports: [
      CommonUiModule
    ]
})
export class FooterComponent implements OnInit {
  currYear: string;

  constructor() {}

  ngOnInit() {
    const dt: Date = new Date();
    this.currYear = dt.getFullYear().toString();
  }

}
