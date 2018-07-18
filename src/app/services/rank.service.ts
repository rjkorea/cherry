import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class RankService {
  rankUrl = `${URL}/a/rank`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public getRankContent(content_oid: string, start: Number, size: Number, sort: string): Observable<{}> {
    const url = `${this.rankUrl}/${content_oid}?start=${start}&size=${size}&sort=${sort}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
