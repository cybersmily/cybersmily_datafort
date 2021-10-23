import { Observable } from 'rxjs';
import { DataService } from './../../../../services/file-services';
import { Injectable } from '@angular/core';
import { ArmorAttributeLists } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ArmorDataAttributesService {

  constructor(private dataService: DataService) { }

  getAttributeData(): Observable<ArmorAttributeLists> {
    return this.dataService.GetJson();
  }
}
