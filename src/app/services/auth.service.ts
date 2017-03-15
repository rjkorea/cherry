import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private loginUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/auth/login';
  private signupUrl = 'http://' + environment.api.host + ':' + environment.api.port + '/a/auth/register';
  private isLoggedIn = false;

  constructor(private http: Http, private cookieService: CookieService) {
    this.isLoggedIn = !!this.cookieService.get('csk');
  }

  public login(email: string, password: string): Observable<{}> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.loginUrl, JSON.stringify({email, password}), options)
                    .map((response: Response) => {
                      if(response.status==200) {
                        console.log(response);
                        console.log(this.cookieService.get('csk'));
                        localStorage.setItem('name', response.json().data.name);
                        localStorage.setItem('_id', response.json().data._id);
                        localStorage.setItem('role', response.json().data.role);

                        this.isLoggedIn = true;
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  loggedIn() {
    return this.isLoggedIn;
  }

  logout() {
    this.cookieService.remove('csk');
    localStorage.removeItem('name');
    localStorage.removeItem('_id');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
  }

  public signup(name: string, email: string, password: string,
                password2: string, mobile_number: string): Observable<{}> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    let body = JSON.stringify({name, email, password, password2, mobile_number, 'role':['host']});
    return this.http.post(this.signupUrl, body, options)
                    .map((response: Response) => {
                      if(response.status==200) {
                        console.log(response);
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getRole() {
    return localStorage.getItem('role');
  }

}
