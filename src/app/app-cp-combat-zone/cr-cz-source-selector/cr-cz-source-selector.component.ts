import { Observable } from 'rxjs';
import { CrCzReleasesDataService } from './../services/cr-cz-releases-data/cr-cz-releases-data.service';
import { Component, OnInit, output } from '@angular/core';
import { AsyncPipe, KeyValue } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cs-cr-cz-source-selector',
  standalone: true,
  templateUrl: './cr-cz-source-selector.component.html',
  styleUrl: './cr-cz-source-selector.component.css',
  imports: [MultiSelectModule, AsyncPipe, FormsModule],
})
export class CrCzSourceSelectorComponent implements OnInit {

  selectedSource = output<Array<string>>();
  $releases: Observable<Array<KeyValue<string,string>>>;
  selectedReleases!: Array<string>;

  constructor(private releasesDataService: CrCzReleasesDataService) {}

  ngOnInit(): void {
    this.$releases = this.releasesDataService.releaseList;
  }

  releasesChange(event): void {
    this.selectedSource.emit(this.selectedReleases);
  }
}
