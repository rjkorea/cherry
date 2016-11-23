import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InvitationService {
  private invitationsUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/invitations';

  constructor(private http: Http) { }

  public getInvitations(): Observable<{}> {
    // let headers = new Headers({'Cookie': 'csk=' + localStorage.getItem('csk')});
    // let options = new RequestOptions({headers: headers});
    return this.http.get(this.invitationsUrl)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
