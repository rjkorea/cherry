import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class StatsService {
  statsUrl = `${URL}/a/stats`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public getStatsContent(content_oid: string): Observable<{}> {
    const url = `${this.statsUrl}/${content_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
