import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class TIMService {
  timUrl = `${URL}/a/tim`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public getMatrixTicketOrderContent(content_oid: string, start: Number, size: Number, sort: string): Observable<{}> {
    const url = `${this.timUrl}/matrix/ticket/order/${content_oid}?start=${start}&size=${size}&sort=${sort}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getMatrixTicketTypeContent(content_oid: string, start: Number, size: Number, sort: string): Observable<{}> {
    const url = `${this.timUrl}/matrix/ticket/type/${content_oid}?start=${start}&size=${size}&sort=${sort}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getReportContent(content_oid: string): Observable<{}> {
    const url = `${this.timUrl}/report/${content_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getAnalyticsContent(content_oid: string): Observable<{}> {
    const url = `${this.timUrl}/analytics/${content_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
