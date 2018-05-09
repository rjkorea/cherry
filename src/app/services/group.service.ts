import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class GroupService {
  options: object;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public addGroup(content_oid: string, group: Object): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group`;
    return this.http.post(url, JSON.stringify(group), this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

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

  public updateGroup(content_oid: string, group_oid: string, group: any): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}`;
    return this.http.put(url, JSON.stringify(group), this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public addGroupTicket(content_oid: string, group_oid: string): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}/ticket`;
    return this.http.post(url, JSON.stringify({}), this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public removeGroup(content_oid: string, group_oid: string): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}`;
    return this.http.delete(url, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getGroupTicketList(content_oid: string, group_oid: string, query: string, start: Number, size: Number): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}/tickets?q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateGroupTicket(content_oid: string, group_oid: string, ticket_oid: string, group: any): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}/ticket/${ticket_oid}`;
    return this.http.put(url, JSON.stringify(group), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public removeGroupTicket(content_oid: string, group_oid: string, ticket_oid: string): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}/ticket/${ticket_oid}`;
    return this.http.delete(url, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public resetGroupTicket(content_oid: string, group_oid: string, ticket_oid: string): Observable<{}> {
    const url = `${URL}/a/content/${content_oid}/group/${group_oid}/ticket/${ticket_oid}/reset`;
    return this.http.put(url, JSON.stringify({}), this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
