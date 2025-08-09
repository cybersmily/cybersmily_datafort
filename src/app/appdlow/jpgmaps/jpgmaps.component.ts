import { Observable } from 'rxjs';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-jpgmaps',
    templateUrl: './jpgmaps.component.html',
    styleUrls: ['./jpgmaps.component.css'],
    standalone: false
})
export class JpgmapsComponent implements OnInit {
  imageList$: Observable<
    Array<{
      title: string;
      src: string;
      thumbnail: string;
    }>
  >;

  constructor(private seo: SeoService, private dataService: DataService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Night City JPG Maps',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Night City jpg maps of districts and areas of influence."
    );
    this.imageList$ = this.dataService.GetJson<
      Array<{
        title: string;
        src: string;
        thumbnail: string;
      }>
    >(JsonDataFiles.DLOW_JPGS_JSON);
  }
}
