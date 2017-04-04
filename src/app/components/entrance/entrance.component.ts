import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { WebSocketService } from '../../services/websocket.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css'],
  providers: [NotificationsService]
})
export class EntranceComponent implements OnInit {
  admin_name: string;
  is_entrance: boolean;
  entrance_user: Object;
  notification_unread: Number;
  notification_options: Object;

  constructor(private notificationService: NotificationService,
              private websocketService: WebSocketService,
              private simpleNotificationsService: NotificationsService) {
              }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.is_entrance = false;
    this.entrance_user = {
      'group': '',
      'name': '',
      'mobile_number': '',
      'gender': '',
      'email': '',
      'fee': {}
    };
    this.notification_options = {
      timeOut: 2000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: true,
      maxLength: 128
    }
    this.initWebSocket();
    this.loadNotifications();
  }

  initWebSocket() {
    this.websocketService.getInstance().subscribe(
      response => {
        console.log(response);
        // check admin _id
        if(localStorage.getItem('_id') == response['admin_oid']) {
          console.log(response['admin_oid']);
          this.entrance_user = response;
          this.is_entrance = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 0)
      .subscribe(
        response => {
          this.notification_unread = response['unread_count'];
          console.log(this.notification_unread);
        },
        error => {
          console.log(error);
        }
      );
  }

  onEnter(event) {
    console.log(event);
    this.entrance_user['entered'] = true;
    delete this.entrance_user['admin_oid'];
    this.is_entrance = false;
  }

  onCancel(event) {
    console.log(event);
    this.simpleNotificationsService.error(
      'Cancel',
      'Entrance process',
      this.notification_options
    );
    this.is_entrance = false;
  }

}
