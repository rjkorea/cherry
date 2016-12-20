import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {
  private dashboardUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/dashboard';

  constructor(private http: Http) { }

  public getDashboard(): Observable<{}> {
    return this.http.get(this.dashboardUrl)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
