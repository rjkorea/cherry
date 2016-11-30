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
  admin_image: string;
  notifications: Array<Object>;
  notification_count: Number;
  notification_unread: Number;

  constructor(private invitationService: InvitationService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.admin_name = localStorage.getItem('name');
    this.admin_image = localStorage.getItem('image');
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(0, 10, localStorage.getItem('_id'))
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

}
