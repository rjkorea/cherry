import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class TicketService {
  public ticketColors = ['tkit-mint', 'tkit-coral', 'hangang-blue', 'ultra-bora', 'mustard-norang'];
  typeUrl = `${URL}/a/ticket/type`;
  typesUrl = `${URL}/a/ticket/types`;
  orderUrl = `${URL}/a/ticket/order`;
  ordersUrl = `${URL}/a/ticket/orders`;
  ticketUrl = `${URL}/a/ticket`;
  ticketsUrl = `${URL}/a/tickets`;
  ticketsEntranceUrl = `${URL}/a/tickets/entrance`;
  logsUrl = `${URL}/a/tickets/logs`;
  logUrl = `${URL}/a/ticket/log`;
  options;

  typeUrlV2 = `${URL}/a/v2/ticket/type`;
  typesUrlV2 = `${URL}/a/v2/ticket/types`;
  orderUrlV2 = `${URL}/a/v2/ticket/order`;

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

  public getTypeInfo(id: string): Observable<{}> {
    const url = `${this.typeUrlV2}/${id}/info`;
    return this.http.get(url, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public duplicateTicketType(id: string): Observable<{}> {
    const url = `${this.typeUrlV2}/${id}/duplicate`;
    return this.http.put(url, {}, this.options)
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

  public addOrderV2(data: any): Observable<{}> {
    return this.http.post(this.orderUrlV2, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getOrderList(query: string, start: Number, size: Number, ticket_type_oid: string): Observable<{}> {
    const url = `${this.ordersUrl}?q=${query}&start=${start}&size=${size}&ticket_type_oid=${ticket_type_oid}`;
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

  public sendOrder(id: string, data): Observable<{}> {
    const url = `${this.orderUrl}/${id}/send`;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTicketList(query: string, company_oid: string, content_oid: string, start: Number, size: Number, ticket_order_oid: string): Observable<{}> {
    const url = `${this.ticketsUrl}?q=${query}&company_oid=${company_oid}&content_oid=${content_oid}&start=${start}&size=${size}&ticket_order_oid=${ticket_order_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTicketListByUser(content_oid: string, receive_user_oid: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.ticketsUrl}?content_oid=${content_oid}&receive_user_oid=${receive_user_oid}&start=${start}&size=${size}`;
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

  public updateEnterTicket(id: string): Observable<{}> {
    const url = `${this.ticketUrl}/${id}/enter`;
    return this.http.put(url, {}, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public registerTicket(id: string, user: any): Observable<{}> {
    const url = `${this.ticketUrl}/${id}/register/user`;
    return this.http.put(url, JSON.stringify(user), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public cancelTicket(id: string): Observable<{}> {
    const url = `${this.ticketUrl}/${id}/cancel`;
    return this.http.put(url, {}, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public sendSmsTicket(id: string, data): Observable<{}> {
    const url = `${this.ticketUrl}/${id}/sms/send`;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getLogList(content_oid: string, query: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.logsUrl}?content_oid=${content_oid}&q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getLog(id: string): Observable<{}> {
    const url = `${this.logUrl}/${id}`;
    return this.http.get(url, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTicketEntranceListByUser(content_oid: string, receive_user_oid: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.ticketsEntranceUrl}?content_oid=${content_oid}&receive_user_oid=${receive_user_oid}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // V2
  public getTypeListV2(content_oid: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.typesUrlV2}?start=${start}&size=${size}&content_oid=${content_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getTypeInfoV2(type_oid: string): Observable<{}> {
    const url = `${this.typeUrlV2}/${type_oid}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public createTicketTypeV2(param: Object): Observable<{}> {
    const url = `${this.typeUrlV2}`;
    return this.http.post(url, param, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateTicketTypeV2(type_oid: string, param: Object): Observable<{}> {
    const url = `${this.typeUrlV2}/${type_oid}`;
    return this.http.put(url, param, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public createTicketOrderCsvV2(param: Object): Observable<{}> {
    const url = `${this.orderUrlV2}/csv`;
    return this.http.post(url, param, this.options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
