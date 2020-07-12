import { JsonDataFiles } from './../json-data-files';
import { CS_VERSION, CS_VERSION_KEY } from './../../keys/storageKeys';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { ClothingLists } from '../models/clothing';
import { News } from '../models/articles';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  public GetJson(url: string): Observable<any> {
    return this.http.get(url);
  }

  public GetHTML(url: string, key?: string): Observable<any> {
    // Add a header to accept HTML
    const header = new HttpHeaders({
      'Accept': 'text/html'
    });
    return this.http.get(url, {headers: header, responseType : 'text'});
  }

  public GetAppDataClothes(): Observable<ClothingLists> {
    return this.GetJson(JsonDataFiles.CP2020_FASHION_CLOTHES_JSON);
  }

  public GetDataNews(): Observable<News> {
    return this.GetJson(JsonDataFiles.NEWS_JSON);
  }
}

export interface ITopNav {
  nodes: any[];
}
