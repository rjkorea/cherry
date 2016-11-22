import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private loginUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/auth/login';
  private isLoggedIn = false;

  constructor(private http: Http) {
    this.isLoggedIn = !!localStorage.getItem('csk');
  }

  public login(email: string, password: string): Observable<{}> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.loginUrl, JSON.stringify({email, password}), {headers})
                    .map((response: Response) => {
                      if(response.status==200) {
                        localStorage.setItem('csk', response.json().data.csk);
                        localStorage.setItem('name', response.json().data.admin.name);
                        this.isLoggedIn = true;
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  logout() {
    localStorage.removeItem('csk');
    localStorage.removeItem('name');
    this.isLoggedIn = false;
  }

}
