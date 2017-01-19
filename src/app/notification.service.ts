import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NotificationService {
  private notificationUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/notification';
  private notificationsUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/notifications';
  private options;

  constructor(private http: Http, private cookieService: CookieService) {
    let headers = new Headers({'Content-Type': 'application/json', 'Set-Cookie': 'csk=' + this.cookieService.get('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public getNotifications(start:Number, size:Number, _id: string): Observable<{}> {
    let url = this.notificationsUrl + '?start=' + start + '&size=' + size + '&_id=' + _id;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public readNotification(_id: string): Observable<{}> {
    let url = this.notificationUrl + '/' + _id;
    return this.http.put(url, JSON.stringify({read: true}), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
