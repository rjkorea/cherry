import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
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
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.loginUrl, JSON.stringify({email, password}), options)
                    .map((response: Response) => {
                      if(response.status==200) {
                        console.log(response);
                        localStorage.setItem('csk', response.json().data.csk);
                        localStorage.setItem('name', response.json().data.admin.name);
                        localStorage.setItem('_id', response.json().data.admin._id);
                        localStorage.setItem('image', response.json().data.admin.image);

                        this.isLoggedIn = true;
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  logout() {
    localStorage.removeItem('csk');
    localStorage.removeItem('name');
    localStorage.removeItem('_id');
    localStorage.removeItem('image');
    this.isLoggedIn = false;
  }

}
