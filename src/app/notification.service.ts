import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NotificationService {
  private notificationsUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/notifications';

  constructor(private http: Http) { }

  public getNotifications(start:Number, size:Number, _id: string): Observable<{}> {
    this.notificationsUrl += '?start=' + start + '&size=' + size + '&_id=' + _id;
    return this.http.get(this.notificationsUrl)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
