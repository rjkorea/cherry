import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { NotificationService } from '../notification.service';

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

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 10)
      .subscribe(
        response => {
          this.notifications = response['data'];
          this.notification_count = this.notifications.length;
          this.notification_unread = this.notifications.length;
          console.log(this.notifications);
        },
        error => {
          console.log(error);
        }
      );
  }

}
