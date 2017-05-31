import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {
  private adminUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/admin';
  private adminsUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/admins';
  private options;

  constructor(private http: Http, private cookieService: CookieService) {
    let headers = new Headers({'Content-Type': 'application/json', 'Set-Cookie': 'csk=' + this.cookieService.get('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public addAdmin(data: any): Observable<{}> {
    return this.http.post(this.adminUrl, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getAdminList(query: string, start: Number, size: Number): Observable<{}> {
    let url = this.adminsUrl + '?q=' + query + '&start=' + start + '&size=' + size;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getAdmin(_id: string): Observable<{}> {
    let url = this.adminUrl + '/' + _id;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateAdmin(id: string, data: any): Observable<{}> {
    let url = this.adminUrl + '/' + id;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateAdminPassword(id: string, data: any): Observable<{}> {
    let url = this.adminUrl + '/' + id + '/password';
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
