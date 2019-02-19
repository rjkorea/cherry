import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class UtilService {
  countriesUrl = `${URL}/a/countries`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: headers});
  }

  public getCountryList(query: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.countriesUrl}?q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getMonths() {
    return [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ];
  }

  getDays() {
    return [
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31'
    ];
  }

  getGenders() {
    return [
      { name: '남성', value: 'male' },
      { name: '여성', value: 'female' },
      { name: '기타', value: 'not_specific' },
    ];
  }

  getBanks() {
    return [
      '국민은행',
      '우리은행',
      '기업은행',
      '하나은행',
      '외환은행',
      '농협',
      '우체국',
      '신한은행',
      '외환은행',
      'SC제일은행',
      '한국씨티은행',
      '새마을금고',
      '산업은행',
      '신협중앙회',
      '수협은행'
    ];
  }
}
