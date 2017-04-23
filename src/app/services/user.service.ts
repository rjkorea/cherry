import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  private userUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/user';
  private usersUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/users';
  private options;

  constructor(private http: Http, private cookieService: CookieService) {
    let headers = new Headers({'Content-Type': 'application/json', 'Set-Cookie': 'csk=' + this.cookieService.get('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public getUserList(query: string, start: Number, size: Number): Observable<{}> {
    let url = this.usersUrl + '?q=' + query + '&start=' + start + '&size=' + size;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getUser(_id: string): Observable<{}> {
    let url = this.userUrl + '/' + _id;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateUser(id: string, data: any): Observable<{}> {
    let url = this.userUrl + '/' + id;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
