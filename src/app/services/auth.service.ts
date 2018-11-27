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
  signupUrl = `${URL}/a/auth/register`;
  isLoggedIn = false;

  constructor(private http: Http,
              private companyService: CompanyService) {
              this.isLoggedIn = !!localStorage.getItem('csk');
  }

  public login(email: string, password: string): Observable<{}> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(this.loginUrl, JSON.stringify({email, password}), options)
                    .map((response: Response) => {
                      if(response.status === 200) {
                        localStorage.setItem('csk', response.json().data.csk);
                        localStorage.setItem('name', response.json().data.name);
                        localStorage.setItem('_id', response.json().data._id);
                        localStorage.setItem('role', response.json().data.role);
                        localStorage.setItem('tablet_code', response.json().data.tablet_code);
                        this.companyService.getCompany(response.json().data.company_oid)
                          .subscribe(
                            response => {
                              localStorage.setItem('company_name', response['data']['name']);
                            }
                          );
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
    this.isLoggedIn = false;
  }

  getRole() {
    return localStorage.getItem('role');
  }

  public signup(name: string, email: string, password: string,
                password2: string, mobile_number: string): Observable<{}> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    const body = JSON.stringify({name, email, password, password2, mobile_number, 'role':'host'});
    return this.http.post(this.signupUrl, body, options)
                    .map((response: Response) => {
                      if(response.status === 200) {
                        console.log(response);
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
