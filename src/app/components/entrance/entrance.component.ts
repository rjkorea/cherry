import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css'],
  providers: []
})
export class EntranceComponent implements OnInit {
  admin_name: string;
  mode: string;
  tickets: Array<any>;

  constructor(private websocketService: WebSocketService) { }

  ngOnInit() {
    this.mode = 'idle'; //idle, tablet, user search
    this.initWebSocket();
  }

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        console.log(response);
        // check admin _id
        if(localStorage.getItem('_id') == response['admin_oid']) {
          console.log(response['admin_oid']);
          this.mode = 'tablet';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onEnter(event) {
    console.log(event);
  }

  onCancel(event) {
    console.log(event);
  }

  onSearch() {
    console.log('clicke search');
    this.mode = 'search'
  }

}
