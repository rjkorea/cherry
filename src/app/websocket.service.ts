import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebSocketService {
  private notificationsWSUrl = 'ws://' + environment.api.host + ':' + environment.api.port + '/ws';
  private websocket: WebSocket;

  constructor() { }

  public sendMessage(text: string) {
    this.websocket.send(text);
  }

  public getInstance(): Observable<any> {
    this.websocket = new WebSocket(this.notificationsWSUrl);
    this.websocket.onopen = (evt) => {
      console.log(evt);
    };
    return Observable.create(observer => {
      this.websocket.onmessage = (evt) => {
        observer.next(evt);
      }
    })
    .map(response => JSON.parse(response.data))
    .catch((error: any) => Observable.throw(error.json() || 'Server error'))
    .share();
  }

}
