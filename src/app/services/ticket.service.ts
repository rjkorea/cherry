import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class TicketService {
  private typeUrl = `${URL}/a/ticket/type`;
  private typesUrl = `${URL}/a/ticket/types`;
  private orderUrl = `${URL}/a/ticket/order`;
  private ordersUrl = `${URL}/a/ticket/orders`;
  private ticketUrl = `${URL}/a/ticket`;
  private ticketsUrl = `${URL}/a/tickets`;
  private options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public addType(data: any): Observable<{}> {
    return this.http.post(this.typeUrl, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTypeList(content_oid: string, admin_oid: string, query: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.typesUrl}?q=${query}&start=${start}&size=${size}&content_oid=${content_oid}&admin_oid=${admin_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getType(id: string): Observable<{}> {
    const url = `${this.typeUrl}/${id}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateType(id: string, data: any): Observable<{}> {
    const url = `${this.typeUrl}/${id}`;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public addOrder(data: any): Observable<{}> {
    return this.http.post(this.orderUrl, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getOrderList(query: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.ordersUrl}?q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getOrder(id: string): Observable<{}> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateOrder(id: string, data: any): Observable<{}> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public sendOrder(id: string): Observable<{}> {
    const url = `${this.orderUrl}/${id}/send`;
    return this.http.put(url, {}, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTicketList(query: string, company_oid: string, content_oid: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.ticketsUrl}?q=${query}&company_oid=${company_oid}&content_oid=${content_oid}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTicketListByUser(user_oid: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.ticketsUrl}?user_oid=${user_oid}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTicket(id: string): Observable<{}> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateTicket(id: string, data: any): Observable<{}> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public registerTicket(id: string, user: any): Observable<{}> {
    const url = `${this.ticketUrl}/${id}/register/user`;
    return this.http.put(url, JSON.stringify(user), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
