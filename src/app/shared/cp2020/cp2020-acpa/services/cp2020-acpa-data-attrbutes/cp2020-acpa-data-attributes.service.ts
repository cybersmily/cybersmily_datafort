import { map } from 'rxjs/operators';
import { AcpaAttributeData } from './../../models/acpa-attribute-data';
import { Cp2020AppFiles } from './../../../../services/file-services/enum/cp2020-app-files';
import { Observable, of } from 'rxjs';
import { DataService } from './../../../../services/file-services/dataservice/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020ACPADataAttributesService {
  private _acpaAttributeData: AcpaAttributeData;

  constructor(private dataService: DataService) {}

  getData(): Observable<AcpaAttributeData> {
    if (this._acpaAttributeData) {
      return of(this._acpaAttributeData);
    }
    return this.dataService
      .GetJson<AcpaAttributeData>(Cp2020AppFiles.ACPA_ATTRIBUTES)
      .pipe(
        map((data) => {
          this._acpaAttributeData = data;
          return this._acpaAttributeData;
        })
      );
  }
}
