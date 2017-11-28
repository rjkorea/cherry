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

  public uploadPosterImage(id: string, files: FileList): Observable<{}> {
    // WIP: build file form data
    console.log(files);
    const url = `${this.contentUrl}/${id}/image/poster`;
    let form = new FormData();
    form.append('image', files[0], files[0].name);
    form.append('test', 'hello world');
    console.log(form);
    const headers = new Headers({'Content-Type': 'multipart/form-data', 'Authorization': 'csk=' + localStorage.getItem('csk')});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.post(url, form, options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public uploadLogoImage(id: string, files: FileList): Observable<{}> {
    // TODO: build file form data
    const url = `${this.contentUrl}/${id}/image/logo`;
    return this.http.post(url, files, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  public uploadOgImage(id: string, files: FileList): Observable<{}> {
    // TODO: build file form data
    const url = `${this.contentUrl}/${id}/image/og`;
    return this.http.post(url, files, this.options)
                    .map((response: Response) => response.json())
                    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
