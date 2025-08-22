import { JsonDataFiles } from './../json-data-files';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { News } from './../../../models/articles';

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(private http: HttpClient) {}

  public GetJson<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public GetHTML(url: string, key?: string): Observable<any> {
    // Add a header to accept HTML
    const header = new HttpHeaders({
      Accept: 'text/html',
    });
    return this.http.get(url, { headers: header, responseType: 'text' });
  }

  public GetDataNews(): Observable<News> {
    return this.GetJson(JsonDataFiles.NEWS_JSON);
  }
}

export interface ITopNav {
  nodes: any[];
}
