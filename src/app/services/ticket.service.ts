import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TicketService {
  private typeUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/ticket/type';
  private typesUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/ticket/types';
  private options;

  constructor(private http: Http, private cookieService: CookieService) {
    let headers = new Headers({'Content-Type': 'application/json', 'Set-Cookie': 'csk=' + this.cookieService.get('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public addType(data: any): Observable<{}> {
    return this.http.post(this.typeUrl, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTypeList(query: string, start: Number, size: Number): Observable<{}> {
    let url = this.typesUrl + '?q=' + query + '&start=' + start + '&size=' + size;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getType(_id: string): Observable<{}> {
    let url = this.typeUrl + '/' + _id;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateType(id: string, data: any): Observable<{}> {
    let url = this.typeUrl + '/' + id;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
