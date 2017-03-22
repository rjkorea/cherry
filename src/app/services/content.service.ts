import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContentService {
  private contentUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/content';
  private contentsUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/contents';
  private options;

  constructor(private http: Http, private cookieService: CookieService) {
    let headers = new Headers({'Content-Type': 'application/json', 'Set-Cookie': 'csk=' + this.cookieService.get('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public addContent(data: any): Observable<{}> {
    return this.http.post(this.contentUrl, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getContentList(query: string, start: Number, size: Number): Observable<{}> {
    let url = this.contentsUrl + '?q=' + query + '&start=' + start + '&size=' + size;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getContent(_id: string): Observable<{}> {
    let url = this.contentUrl + '/' + _id;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateContent(id: string, data: any): Observable<{}> {
    let url = this.contentUrl + '/' + id;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
