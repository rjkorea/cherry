import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { WebSocketService } from '../../services/websocket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  admin_name: string;
  notifications: Array<Object>;
  notification_count: Number;
  notification_unread: Number;
  edit_invitation_form: FormGroup;

  constructor(private notificationService: NotificationService,
              private fb:FormBuilder) {
              }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 20)
      .subscribe(
        response => {
          this.notifications = response['data'];
          this.notification_count = response['count'];
          this.notification_unread = response['unread_count'];
          console.log(this.notifications);
        },
        error => {
          console.log(error);
        }
      );
  }

  readNotification(_id: string) {
    this.notificationService.readNotification(_id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

}
