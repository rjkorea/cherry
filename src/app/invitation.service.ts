import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'angular2-cookie/core';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InvitationService {
  private invitationsUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/invitations';
  private invitationUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/invitation';
  private options;

  constructor(private http: Http, private cookieService: CookieService) {
    let headers = new Headers({'Content-Type': 'application/json', 'Set-Cookie': 'csk=' + this.cookieService.get('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public getInvitations(start: Number, size: Number): Observable<{}> {
    let url = this.invitationsUrl + '?start=' + start + '&size=' + size;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getInvitation(_id: string): Observable<{}> {
    let url = this.invitationUrl + '/' + _id;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public addInvitation(invitation: any): Observable<{}> {
    return this.http.post(this.invitationUrl, JSON.stringify(invitation), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateInvitation(invitation: any): Observable<{}> {
    let url = this.invitationUrl + '/' + invitation['_id']
    delete invitation['_id'];
    delete invitation['updated_at'];
    delete invitation['created_at'];
    return this.http.put(url, JSON.stringify(invitation), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
