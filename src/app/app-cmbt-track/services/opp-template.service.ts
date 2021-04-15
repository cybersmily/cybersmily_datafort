import { JsonDataFiles } from './../../shared/services/file-services';
import { CmbtTrckOppTemplate } from '../../shared/models/cmbt-trck/cmbt-trck-opp-template';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './../../shared/services/file-services/data.service';
import { CmbtTrckTemplate } from '../../shared/models/cmbt-trck/cmbt-trck-template';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OppTemplateService {

  private _templateList: Array<CmbtTrckTemplate>;

  constructor( private dataService: DataService) { }


  /**
   * Loads the list of opponent templates.
   *
   * @readonly
   * @type {Observable<Array<CmbtTrckTemplate>>}
   * @memberof OppTemplateService
   */
  get TemplateList(): Observable<Array<CmbtTrckTemplate>> {
    if (this._templateList) {
      return of(this._templateList);
    }
    return this.dataService
    .GetJson(JsonDataFiles.CP2020_CMBTTRCK_OPP_TEMPLATES_JSON)
    .pipe(
      map( data => {
        this._templateList = data.templates;
        return this._templateList;
      })
    );
  }


  /**
   * Gets the specified template file and adds it to the
   * existing entry.
   *
   * @param {string} file
   * @returns {Observable<CmbtTrckOppTemplate>}
   * @memberof OppTemplateService
   */
  getTemplate(file: string): Observable<CmbtTrckOppTemplate> {
    const exists = this._templateList.findIndex( t => t.json === file);
    if (this._templateList[exists].template) {
      return of(this._templateList[exists].template);
    }
    return this.dataService
    .GetJson(`/json/apps/cbttrk/templates/${file}.json`)
    .pipe( map( data => {
      this._templateList[exists].template = data;
      return this._templateList[exists].template;
    }));
  }
}
