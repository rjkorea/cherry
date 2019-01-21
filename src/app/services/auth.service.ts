import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { CompanyService} from './company.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class AuthService {
  loginUrl = `${URL}/a/auth/login`;
  signupPersonalUrl = `${URL}/a/auth/signup/personal`;
  signupBusinessUrl = `${URL}/a/auth/signup/business`;
  isLoggedIn = false;

  constructor(private http: Http,
              private companyService: CompanyService) {
              this.isLoggedIn = !!localStorage.getItem('csk');
  }

  public login(body: any): Observable<{}> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.loginUrl, body, options)
                    .map((response: Response) => {
                      if (response.status === 200) {
                        localStorage.setItem('csk', response.json().data.csk);
                        localStorage.setItem('name', response.json().data.name);
                        localStorage.setItem('_id', response.json().data._id);
                        localStorage.setItem('role', response.json().data.role);
                        localStorage.setItem('tablet_code', response.json().data.tablet_code);
                        localStorage.setItem('company_name', response.json().data.company_name);
                        localStorage.setItem('company_oid', response.json().data.company_oid);
                        localStorage.setItem('login_at', response.json().data.login_at);
                        this.isLoggedIn = true;
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  loggedIn() {
    return this.isLoggedIn;
  }

  logout() {
    localStorage.removeItem('csk');
    localStorage.removeItem('name');
    localStorage.removeItem('_id');
    localStorage.removeItem('role');
    localStorage.removeItem('tablet_code');
    localStorage.removeItem('company_name');
    localStorage.removeItem('login_at');
    this.isLoggedIn = false;
  }

  getRole() {
    return localStorage.getItem('role');
  }

  signupPersonal(body: any): Observable<{}> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.signupPersonalUrl, body, options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  signupBusiness(body: any): Observable<{}> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.signupBusinessUrl, body, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
