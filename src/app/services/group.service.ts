import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class GroupService {
  groupUrl = `${URL}/a/content`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  // public addPlace(data: any): Observable<{}> {
  //   return this.http.post(this.placeUrl, JSON.stringify(data), this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

  public getGroup(content_oid: string, group_oid: string): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getGroupList(content_oid: string, query: string, start: Number, size: Number): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/groups?q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getGroupTicketList(content_oid: string, group_oid: string, query: string, start: Number, size: Number): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}/tickets?q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // public getPlace(id: string): Observable<{}> {
  //   const url = `${this.placeUrl}/${id}`;
  //   return this.http.get(url, this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

  // public updatePlace(id: string, data: any): Observable<{}> {
  //   const url = `${this.placeUrl}/${id}`;
  //   return this.http.put(url, JSON.stringify(data), this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

  // public getStats(): Observable<{}> {
  //   const url = `${this.placesUrl}/stats`;
  //   return this.http.get(url, this.options)
  //                   .map((response: Response) => response.json())
  //                   .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  // }

}
