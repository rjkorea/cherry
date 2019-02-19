import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = `${environment.api.protocol}://${environment.api.host}:${environment.api.port}`;

@Injectable()
export class ContentService {
  contentUrl = `${URL}/a/content`;
  contentsUrl = `${URL}/a/contents`;
  contentUrlV2 = `${URL}/a/v2/content`;
  contentsUrlV2 = `${URL}/a/v2/contents`;
  options;

  constructor(private http: Http) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    this.options = new RequestOptions({headers: headers, withCredentials: true});
  }

  public addContent(data: any): Observable<{}> {
    return this.http.post(this.contentUrl, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getContentList(query: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.contentsUrl}?q=${query}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getContent(id: string): Observable<{}> {
    const url = `${this.contentUrl}/${id}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public updateContent(id: string, data: any): Observable<{}> {
    const url = `${this.contentUrl}/${id}`;
    return this.http.put(url, JSON.stringify(data), this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public uploadPosterImage(id: string, file: File): Observable<{}> {
    const url = `${this.contentUrl}/${id}/image/poster`;
    const form = new FormData();
    form.append('image', file, file.name);
    const headers = new Headers({'Authorization': 'csk=' + localStorage.getItem('csk')});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(url, form, options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public uploadLogoImage(id: string, file: File): Observable<{}> {
    const url = `${this.contentUrl}/${id}/image/logo`;
    const form = new FormData();
    form.append('image', file, file.name);
    const headers = new Headers({ 'Authorization': 'csk=' + localStorage.getItem('csk') });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, form, options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public uploadOgImage(id: string, file: File): Observable<{}> {
    const url = `${this.contentUrl}/${id}/image/og`;
    const form = new FormData();
    form.append('image', file, file.name);
    const headers = new Headers({ 'Authorization': 'csk=' + localStorage.getItem('csk') });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, form, options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public uploadExtraImage(id: string, num: string, file: File): Observable<{}> {
    const url = `${this.contentUrl}/${id}/image/extra_${num}`;
    const form = new FormData();
    form.append('image', file, file.name);
    const headers = new Headers({ 'Authorization': 'csk=' + localStorage.getItem('csk') });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, form, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public addContentV2(data: FormData): Observable<{}> {
    const url = `${this.contentUrlV2}`;
    const headers = new Headers({ 'Authorization': 'csk=' + localStorage.getItem('csk') });
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.post(url, data, options)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public getContentListV2(status: string, start: Number, size: Number): Observable<{}> {
    const url = `${this.contentsUrlV2}?status=${status}&start=${start}&size=${size}`;
    return this.http.get(url, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
