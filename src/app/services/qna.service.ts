import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class QnaService {
  contentUrl = `${URL}/a/qna`;
  contentsUrl = `${URL}/a/qnas`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  // public addContent(data: any): Observable<{}> {
  //   return this.http.post(this.contentUrl, JSON.stringify(data), this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

  public getQnaList(query: string, start: Number, size: Number, content_oid: string): Observable<{}> {
    const url = `${this.contentsUrl}?q=${query}&start=${start}&size=${size}&content_oid=${content_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // public getContent(id: string): Observable<{}> {
  //   const url = `${this.contentUrl}/${id}`;
  //   return this.http.get(url, this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

  // public updateContent(id: string, data: any): Observable<{}> {
  //   const url = `${this.contentUrl}/${id}`;
  //   return this.http.put(url, JSON.stringify(data), this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

}
